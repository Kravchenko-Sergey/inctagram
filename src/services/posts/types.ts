type Image = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type CreatePostCommentResponse = {
  id: number
  description: string
  location: string
  images: Image[]
  createdAt: Date
  updatedAt: Date
  ownerId: number
}

export type CreatePostCommentRequest = {
  description: string
  childrenMetadata: { uploadId: string }[]
}
export type CreatePostImageResponse = {
  images: Image[]
}
export type CreatePostImageRequest = FormData

export type GetAllPostsRequest = {
  idLastUploadedPost?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
}

export type GetAllPostsResponse = {
  totalCount: number
  pageSize: number
  items: CreatePostCommentResponse[]
}
