import { baseApi } from '@/services'
import {
  CreatePostCommentRequest,
  CreatePostCommentResponse,
  CreatePostImageRequest,
  CreatePostImageResponse,
  GetAllPostsRequest,
  GetAllPostsResponse,
} from '@/services/posts/types'

export const postAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createPostComments: build.mutation<CreatePostCommentResponse, CreatePostCommentRequest>({
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
      query: ({ idLastUploadedPost, pageSize }) => ({
        url: `posts/user/${idLastUploadedPost}`,
        params: {
          pageSize,
        },
      }),
      providesTags: ['getUserPosts'],
    }),
    deleteUserPost: build.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getUserPosts'],
    }),
  }),
})

export const {
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
  useGetUserPostsQuery,
  useDeleteUserPostMutation,
} = postAPI
