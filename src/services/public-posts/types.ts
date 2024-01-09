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

export type GetUserPostsDataResponse = {
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
type PostsItemsImages = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}
type PostsItemsOwner = {
  firstName: string
  lastName: string
}
export type PostProfile = {
  id: number
  description: string
  location: string
  images: PostsItemsImages[]
  createdAt: Date
  updatedAt: Date
  ownerId: number
  avatarOwner: string
  owner: PostsItemsOwner
}
export type Posts = {
  totalCount: number
  pageSize: number
  items: PostProfile[]
}

export type GetPublicPostResponse = {
  posts: PostProfile
}

export type PublicProfileRequest = {
  id: number
  userName: string
  aboutMe: string
  avatars: [
    {
      url: string
      width: number
      height: number
      fileSize: number
    },
  ]
}

export type GetUserPostsDataRequest = {
  userId: number
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'desc' | 'asc'
}
