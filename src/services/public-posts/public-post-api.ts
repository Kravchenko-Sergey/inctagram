import { baseApi } from '@/services'
import { getLastCreatedPostsRequest } from '@/services/public-posts/types'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getLastCreatedPosts: build.query<void, getLastCreatedPostsRequest>({
        query: ({ idLastUploadedPost, pageSize, sortBy, sortDirection }) => ({
          url: `public-posts/all/${idLastUploadedPost ? idLastUploadedPost : ''}`,
          method: 'GET',
          params: { pageSize, sortBy, sortDirection },
        }),
      }),
      getUsersAmount: build.query<void, void>({
        query: () => ({
          url: `fake-url`,
          method: 'GET',
        }),
      }),
      getProfileData: build.query<void, { userId: number }>({
        query: ({ userId }) => ({
          url: `public-posts/user/${userId}`,
          method: 'GET',
        }),
      }),
    }
  },
})

export const {
  util: { getRunningQueriesThunk },
} = publicPostApi

export const { getLastCreatedPosts, getUsersAmount, getProfileData } = publicPostApi.endpoints
export const { useGetLastCreatedPostsQuery, useGetUsersAmountQuery, useGetProfileDataQuery } =
  publicPostApi
