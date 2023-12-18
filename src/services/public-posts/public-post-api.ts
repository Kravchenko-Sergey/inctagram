import { baseApi } from '@/services'
import {
  GetLastCreatedPostsRequest,
  GetLastCreatedPostsResponse,
  GetProfileDataResponse,
  GetPublicPostResponse,
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
      getPublicPost: build.query<GetPublicPostResponse, { postId: number }>({
        query: ({ postId }) => ({
          url: `/public-posts/p/${postId}`,
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

export const { getPublicPost, getProfileData } = publicPostApi.endpoints
export const {
  useGetPublicPostQuery,
  useGetLastCreatedPostsQuery,
  useLazyGetLastCreatedPostsQuery,
  useLazyGetProfileDataQuery,
  useGetProfileDataQuery,
} = publicPostApi
