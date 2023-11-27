import { baseApi } from '@/services'
import {
  GetLastCreatedPostsRequest,
  GetLastCreatedPostsResponse,
} from '@/services/public-posts/types'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getLastCreatedPosts: build.query<GetLastCreatedPostsResponse, GetLastCreatedPostsRequest>({
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
export const {
  useGetLastCreatedPostsQuery,
  useLazyGetLastCreatedPostsQuery,
  useGetUsersAmountQuery,
  useGetProfileDataQuery,
} = publicPostApi
