import { PostImageType } from '@/services/posts'

export const filterImagesOnly360 = (images: PostImageType[]): PostImageType[] => {
  return images.filter(item => item.height === 360)
}
