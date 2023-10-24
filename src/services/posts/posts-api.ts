import { baseApi } from '@/services'
import {
  CreatePostCommentRequest,
  CreatePostCommentResponse,
  CreatePostImageRequest,
  CreatePostImageResponse,
} from '@/services/posts/types'

export const postAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createPostComments: build.mutation<CreatePostCommentResponse, CreatePostCommentRequest>({
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
  }),
})

export const { useCreatePostCommentsMutation, useCreatePostPhotoMutation } = postAPI
