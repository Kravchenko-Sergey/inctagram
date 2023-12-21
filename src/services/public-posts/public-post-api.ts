import { baseApi } from '@/services'
import {
  GetLastCreatedPostsRequest,
  GetLastCreatedPostsResponse,
  GetPublicPostResponse,
  GetUserPostsDataRequest,
  GetUserPostsDataResponse,
  PostProfile,
  Posts,
  PublicProfileRequest,
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
      getPublicPost: build.query<PostProfile, { postId: number }>({
        query: ({ postId }) => ({
          url: `public-posts/${postId}`,
          method: 'GET',
        }),
      }),

      getUserPostsData: build.query<
        // GetUserPostsDataResponse & { fullName: string | null },
        Posts,
        GetUserPostsDataRequest
      >({
        query: ({ userId, endCursorPostId, pageSize, sortBy, sortDirection }) => {
          console.log('userId', userId)

          return {
            url: `public-posts/user/${userId}${endCursorPostId ? `/${endCursorPostId}` : ''}`,
            method: 'GET',
            // params: { pageSize, sortBy, sortDirection },
          }
        },
      }),

      getProfileData: build.query<PublicProfileRequest, { profileId: number }>({
        query: ({ profileId }) => ({
          url: `public-user/profile/${profileId}`,
          method: 'GET',
        }),
      }),
    }
  },
})

export const {
  util: { getRunningQueriesThunk },
} = publicPostApi

// export const { getPublicPost, getProfileData, getUserPostsData } = publicPostApi.endpoints
export const { getPublicPost, getProfileData, getUserPostsData } = publicPostApi.endpoints
export const {
  useGetPublicPostQuery,
  useGetLastCreatedPostsQuery,
  useLazyGetLastCreatedPostsQuery,
  useGetUserPostsDataQuery,
  useLazyGetUserPostsDataQuery,
  useGetProfileDataQuery,
} = publicPostApi
