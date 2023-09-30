import { instagramAPI } from '@/api/api'
import { ArgUpdateProfile, GetProfileResponse, UploadAvatarResponse } from '@/api/profile-api/types'

export const profileAPI = instagramAPI.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<GetProfileResponse, void>({
      query: () => ({
        url: `users/profile`,
      }),
    }),
    updateProfile: build.mutation<any, ArgUpdateProfile>({
      query: body => ({
        url: `users/profile`,
        method: 'PUT',
        body,
      }),
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
    }),
    deleteAvatar: build.mutation<void, void>({
      query: body => ({
        url: `users/profile/avatar`,
        method: 'DELETE',
        body,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPI
