export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
}

export type GetProfileResponse = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string | null
  dateOfBirth: Date
  aboutMe: string | null
  avatars: Avatar[]
}

export type ArgGetProfile = { profileId: number | undefined }

export type ArgUpdateProfile = Omit<GetProfileResponse, 'id' | 'avatars'>

export type UploadAvatarResponse = { avatars: Avatar[] }

export type ArgUploadAvatar = FormData
