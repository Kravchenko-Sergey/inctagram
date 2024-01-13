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

          const  lastItem = endCursorPostId ? endCursorPostId : ''

          return {
            url: `public-posts/user/${userId}/${lastItem}`,
            method: 'GET',
            params: { pageSize},
          }
        },
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },

        merge: (currentCache, newItems) => {
          currentCache.items.push(...newItems.items)
          currentCache.totalCount = newItems.totalCount
        },

        forceRefetch({ currentArg, previousArg }) {
          return true
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

export const { getPublicPost, getProfileData, getUserPostsData } = publicPostApi.endpoints
export const {
  useGetPublicPostQuery,
  useLazyGetPublicPostQuery,
  useGetUserPostsDataQuery,
  useGetProfileDataQuery,
  useLazyGetUserPostsDataQuery,
} = publicPostApi
