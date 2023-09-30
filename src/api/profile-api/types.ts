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
  city: string
  dateOfBirth: string
  aboutMe: string
  avatars: Avatar[]
}

export type ArgUpdateProfile = Omit<GetProfileResponse, 'id' | 'avatars'>

export type UploadAvatarResponse = { avatars: Avatar[] }
