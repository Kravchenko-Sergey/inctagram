import { baseApi } from '@/services'
import {
  GetLastCreatedPostsRequest,
  GetLastCreatedPostsResponse,
  GetUserPostsDataRequest,
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

      getUserPostsData: build.query<Posts, GetUserPostsDataRequest>({
        query: ({ userId, endCursorPostId, pageSize, sortBy, sortDirection }) => {
          return {
            url: `public-posts/user/${userId}${endCursorPostId ? `/${endCursorPostId}` : ''}`,
            method: 'GET',
            params: { pageSize, sortBy, sortDirection }, //todo need refactor
          }
        },
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
        merge: (currentCache, newItems, { arg, requestId }) => {
          if (arg.endCursorPostId === undefined) {
            return newItems
          }
          currentCache.items.push(...newItems.items)
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
        providesTags: ['getUserPostsData'],
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

export const { getPublicPost, getProfileData, getUserPostsData } = publicPostApi.endpoints
export const {
  useGetPublicPostQuery,
  useLazyGetPublicPostQuery,
  useGetUserPostsDataQuery,
  useGetProfileDataQuery,
} = publicPostApi
