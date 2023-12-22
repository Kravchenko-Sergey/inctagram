import {
  ArgGetProfile,
  ArgUpdateProfile,
  ArgUploadAvatar,
  GetProfileResponse,
  UploadAvatarResponse,
} from '@/services/profile/types'
import { baseApi } from '@/services'

export const profileAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: `users/profile`,
      }),
      providesTags: ['getProfile'],
    }),
    updateProfile: build.mutation<void, ArgUpdateProfile>({
      query: body => ({
        url: `users/profile`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['getProfile'],
    }),
    deleteProfile: build.mutation<void, void>({
      query: body => ({
        url: `users/profile`,
        method: 'DELETE',
        body,
      }),
    }),
    uploadAvatar: build.mutation<UploadAvatarResponse, ArgUploadAvatar>({
      query: body => ({
        url: `users/profile/avatar`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['getProfile'],
    }),
    deleteAvatar: build.mutation<void, void>({
      query: body => ({
        url: `users/profile/avatar`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['getProfile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = profileAPI
