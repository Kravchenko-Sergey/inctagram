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
