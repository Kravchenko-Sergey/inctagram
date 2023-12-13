import { baseApi } from '@/services'
import {
  CreatePostRequest,
  CreatePostImageRequest,
  CreatePostImageResponse,
  GetAllPostsRequest,
  GetAllPostsResponse,
  Post,
  PostRequest,
  EditPostRequest,
} from '@/services/posts/types'

export const postAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createPostComments: build.mutation<Post, CreatePostRequest>({
      query: body => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getUserPosts'],
    }),
    createPostPhoto: build.mutation<CreatePostImageResponse, CreatePostImageRequest>({
      query: body => ({
        url: `posts/image`,
        method: 'POST',
        body,
      }),
    }),
    getUserPosts: build.query<GetAllPostsResponse, GetAllPostsRequest>({
      query: ({ idLastUploadedPost = '', pageSize }) => ({
        url: `posts/user${idLastUploadedPost ? `/${idLastUploadedPost}` : ''}`,
        params: {
          pageSize,
        },
      }),
      providesTags: ['getUserPosts'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg, requestId }) => {
        if (arg.idLastUploadedPost === undefined) {
          return newItems
        }
        currentCache.items.push(...newItems.items)
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
    getUserPost: build.query<Post, PostRequest>({
      query: ({ postId }) => {
        return {
          url: `posts/p/${postId}`,
        }
      },
      providesTags: result => [{ type: 'post' as const, id: result?.id }, 'post'],
    }),
    deleteUserPost: build.mutation<void, PostRequest>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getUserPosts'],
    }),
    deletePostImage: build.mutation<void, { imageId: string }>({
      query: ({ imageId }) => ({
        url: `posts/image/${imageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getUserPosts'],
    }),
    editPost: build.mutation<void, EditPostRequest>({
      query: ({ postId, description }) => ({
        url: `posts/${postId}`,
        method: 'PUT',
        body: {
          description,
        },
      }),
      invalidatesTags: ['getUserPosts'],

      // invalidatesTags: (result, error, arg) => [{ type: 'post', id: arg.postId }],
      async onQueryStarted({ postId, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postAPI.util.updateQueryData('getUserPost', { postId }, draft => {
            Object.assign(draft, patch)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
  useGetUserPostsQuery,
  useLazyGetUserPostQuery,
  useDeleteUserPostMutation,
  useDeletePostImageMutation,
  useEditPostMutation,
} = postAPI
