import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { TOKEN_LOCAL_STORAGE_KEY } from '@/src/consts/localstorage'

const baseUrl = ''

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

        if (refreshResult.meta?.response?.status === 204) {
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
  // baseQuery: baseQuery,
  // baseQuery: retry(baseQuery, {maxRetries:3}), повтор при ощибке и количество повторов запроса
  endpoints: () => ({}),
  tagTypes: [],
  // keepUnusedDataFor:5 время хранения данных в кеше 5 сек есть и для квери запросов оно
  // refetchOnFocus: true обновдение при смене вкладки когда страница теряет и полуяает фокус
  // refetchOnReconnect: true обновлене странияки при появлении интернета и реконекте  все это можно вказывать в хуке
})
