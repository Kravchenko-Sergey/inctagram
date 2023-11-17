import { baseApi } from '@/services'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getLastCreatedPosts: build.mutation<void, void>({
        query: () => ({
          url: `fake-url`,
          method: 'GET',
        }),
      }),
      getUsersAmount: build.mutation<void, void>({
        query: () => ({
          url: `fake-url`,
          method: 'GET',
        }),
      }),
    }
  },
})

export const {
  util: { getRunningQueriesThunk },
} = publicPostApi

export const { getLastCreatedPosts, getUsersAmount } = publicPostApi.endpoints
export const { useGetUsersAmountMutation, useGetLastCreatedPostsMutation } = publicPostApi
