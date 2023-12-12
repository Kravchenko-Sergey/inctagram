import { baseApi } from '@/services'
import {
  GetLastCreatedPostsRequest,
  GetLastCreatedPostsResponse,
  GetProfileDataResponse,
} from '@/services/public-posts/types'
import { GetProfileResponse } from '@/services/profile'

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
      getProfileData: build.query<
        GetProfileDataResponse & { fullName: string | null },
        { userId: number }
      >({
        query: ({ userId }) => {
          return {
            url: `public-posts/user/${userId}`,
            method: 'GET',
          }
        },
        transformResponse: (response: GetProfileDataResponse) => {
          const fullName = response?.profile.firstName
            ? `${response?.profile.firstName} ${response?.profile.lastName}`
            : null

          return { ...response, fullName }
        },
        providesTags: ['getProfileData'],
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
