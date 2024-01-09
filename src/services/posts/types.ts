export type PostImageType = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type Post = {
  id: number
  description: string
  location: string
  images: PostImageType[]
  createdAt: Date
  updatedAt: Date
  ownerId: number
  avatarOwner: string
  owner: Owner
}

type Owner = {
  firstName: string
  lastName: string
}
export type CreatePostRequest = {
  description: string
  childrenMetadata: { uploadId: string }[]
}
export type CreatePostImageResponse = {
  images: PostImageType[]
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
  items: Post[]
}

export type PostRequest = {
  postId: number
}

export type EditPostRequest = {
  description: string
  postId: number
}
