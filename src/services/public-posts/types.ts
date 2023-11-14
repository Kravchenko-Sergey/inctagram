import { Post } from '@/services/posts'
import { GetProfileResponse } from '@/services/profile'

export type PublicUserRequest = {
  userId: number
}

export type PublicUserPosts = {
  totalCount: number
  pageSize: number
  items: Post[]
}

export type PublicUserResponse = {
  profile: GetProfileResponse
  posts: PublicUserPosts
}
