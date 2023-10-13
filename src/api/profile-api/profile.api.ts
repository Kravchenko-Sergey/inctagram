import { instagramAPI } from '@/api'
import { ArgUpdateProfile, GetProfileResponse, UploadAvatarResponse } from '@/api/profile-api/types'

export const profileAPI = instagramAPI.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<GetProfileResponse, { profileId: number | undefined }>({
      query: ({ profileId: profileId }) => ({
        url: `users/profile/${profileId}`,
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
    uploadAvatar: build.mutation<UploadAvatarResponse, any>({
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
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = profileAPI
