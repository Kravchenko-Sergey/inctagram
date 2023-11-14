import { PostImageType } from '@/services/posts'

export const sortImagesByWidth = (images: PostImageType[]): PostImageType[] => {
  const sortedImages = [...images] // Create a copy of the original array

  sortedImages.sort((a, b) => a.width - b.width)

  return sortedImages
}
