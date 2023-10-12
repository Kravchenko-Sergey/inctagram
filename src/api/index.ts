import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { TOKEN_LOCAL_STORAGE_KEY } from '@/consts/local-storage'
import { tokenSetterToLocalStorage } from '@/helpers/token-setter-to-local-storage'

export const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL ?? ''

if (!baseUrl) {
  console.log('Please, provide api url in .env')
}

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  await mutex.waitForUnlock()
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/update-tokens',
            method: 'POST',
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const data = refreshResult.data as { accessToken: string } // TODO add type

          tokenSetterToLocalStorage(data.accessToken)
        }

        if (refreshResult.meta?.response?.status === 200) {
          result = await baseQuery(args, api, extraOptions)
        } else {
          await baseQuery(
            {
              url: 'auth/logout',
              method: 'POST',
            },
            api,
            extraOptions
          )
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const instagramAPI = createApi({
  reducerPath: 'instagramAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['getProfile'],
})
