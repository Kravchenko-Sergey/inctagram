import { ImageType } from '@/components/posts/create/create-post-slice'
import { getFilteredImg } from '@/components/posts/create/edit-photo'

export const saveFilteredImage = async (images: ImageType[]): Promise<ImageType[]> => {
  try {
    const updatedImages = await Promise.all(
      images.map(async el => {
        const filteredImage = await getFilteredImg(el.img, el.filter)

        return {
          img: filteredImage as string,
        }
      })
    )

    return updatedImages as ImageType[]
  } catch (e) {
    return []
  }
}
