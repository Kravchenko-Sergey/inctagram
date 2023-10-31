import { baseApi } from '@/services'
import {
  CreatePostRequest,
  CreatePostImageRequest,
  CreatePostImageResponse,
  GetAllPostsRequest,
  GetAllPostsResponse,
  PostResponse,
  PostRequest,
} from '@/services/posts/types'

export const postAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createPostComments: build.mutation<PostResponse, CreatePostRequest>({
      query: body => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
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
    getUserPost: build.query<PostResponse, PostRequest>({
      query: ({ postId }) => ({
        url: `posts/p/${postId}`,
      }),
    }),
    deleteUserPost: build.mutation<void, PostRequest>({
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
  useLazyGetUserPostQuery,
  useDeleteUserPostMutation,
} = postAPI
