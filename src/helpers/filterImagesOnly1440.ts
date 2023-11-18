import { PostImageType } from '@/services/posts'

export const filterImagesOnly1440 = (images: PostImageType[]): PostImageType[] => {
  return images.filter(item => item.height === 1440)
}
