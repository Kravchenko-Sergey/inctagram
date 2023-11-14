export type AvatarType = {
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
  avatars: AvatarType[]
}

export type ArgGetProfile = { profileId: number | undefined }

export type ArgUpdateProfile = Omit<GetProfileResponse, 'id' | 'avatars'>

export type UploadAvatarResponse = { avatars: AvatarType[] }

export type ArgUploadAvatar = FormData

export type UpdateTokenResult = { accessToken: string }
