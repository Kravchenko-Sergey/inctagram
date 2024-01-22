import { baseApi } from '@/services'
import {
  CreatePostImageRequest,
  CreatePostImageResponse,
  CreatePostRequest,
  EditPostRequest,
  Post,
  PostRequest,
} from '@/services/posts/types'

export const postAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createPostComments: build.mutation<Post, CreatePostRequest>({
      query: body => {
        return {
          url: `posts`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['getUserPostsData'],
    }),
    createPostPhoto: build.mutation<CreatePostImageResponse, CreatePostImageRequest>({
      query: body => ({
        url: `posts/image`,
        method: 'POST',
        body,
      }),
    }),
    getUserPost: build.query<Post, PostRequest>({
      query: ({ postId }) => {
        return {
          url: `posts/p/${postId}`,
        }
      },
    }),
    deleteUserPost: build.mutation<void, PostRequest>({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['getUserPostsData'],
    }),
    deletePostImage: build.mutation<void, { imageId: string }>({
      query: ({ imageId }) => ({
        url: `posts/image/${imageId}`,
        method: 'DELETE',
      }),
    }),
    editPost: build.mutation<void, EditPostRequest>({
      query: ({ postId, description }) => {
        return {
          url: `posts/${postId}`,
          method: 'PUT',
          body: {
            description,
          },
        }
      },
      invalidatesTags: ['getUserPostsData'],
    }),
  }),
})

export const {
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
  useDeleteUserPostMutation,
  useDeletePostImageMutation,
  useEditPostMutation,
} = postAPI
