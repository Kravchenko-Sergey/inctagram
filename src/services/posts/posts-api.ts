import { baseApi } from '@/services'
import {
  CreatePostImageRequest,
  CreatePostImageResponse,
  CreatePostRequest,
  EditPostRequest,
  GetAllPostsRequest,
  GetAllPostsResponse,
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
      invalidatesTags: ['getProfileData'],
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
    }),
    getUserPost: build.query<Post, PostRequest>({
      query: ({ postId }) => {
        return {
          url: `posts/p/${postId}`,
        }
      },
      // providesTags: result => {   убрал надо ли?
      //   console.log('result?.id ', result?.id)
      //   console.log('result', result)

      // return [{ type: 'post' as const, id: result?.id }, 'post']
      // return [{ type: 'getProfileData' as const, id: result?.id }, 'getProfileData'] // эта инвалидация приводила
      // к падению запроса
      // },
    }),
    deleteUserPost: build.mutation<void, PostRequest>({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['getProfileData'],
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

      // invalidatesTags: (result, error, arg) => [{ type: 'post', id: arg.postId }], // какую тут инвалидацию?
      // async onQueryStarted({ postId, ...patch }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     postAPI.util.updateQueryData('getUserPost', { postId }, draft => {
      //       Object.assign(draft, patch)
      //     })
      //   )
      //
      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },
      invalidatesTags: ['getProfileData'],
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
