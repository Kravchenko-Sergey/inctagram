import { Post } from '@/services/posts'

export type GetLastCreatedPostsRequest = {
  idLastUploadedPost?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'desc' | 'asc'
}
export type GetLastCreatedPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type GetProfileDataResponse = {
  profile: Profile
  posts: Posts
}
type RootObjectProfileAvatars = {
  url: string
  width: number
  height: number
  fileSize: number
}
type Profile = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  dateOfBirth: string
  aboutMe: string
  avatars: RootObjectProfileAvatars[]
  createdAt: string
}
type RootObjectPostsItemsImages = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}
type RootObjectPostsItemsOwner = {
  firstName: string
  lastName: string
}
export type PostProfile = {
  id: number
  description: string
  location: string
  images: RootObjectPostsItemsImages[]
  createdAt: Date
  updatedAt: Date
  ownerId: number
  avatarOwner: string
  owner: RootObjectPostsItemsOwner
}
type Posts = {
  totalCount: number
  pageSize: number
  items: PostProfile[]
}
