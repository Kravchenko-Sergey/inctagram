import { baseApi } from '@/services'
import { PublicUserResponse, PublicUserRequest } from './types'

export const publicPostAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicUserProfile: build.query<PublicUserResponse, PublicUserRequest>({
      query: ({ userId, pageSize }) => ({
        url: `public-posts/user/${userId}`,
        params: {
          pageSize,
        },
      }),
    }),
  }),
})

export const { useGetPublicUserProfileQuery } = publicPostAPI
