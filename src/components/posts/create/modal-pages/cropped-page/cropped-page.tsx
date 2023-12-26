import { useAppSelector } from '@/services'
import { CroppedImage } from '@/components/posts/create/cropped-image'

export const CroppedPage = () => {
  const images = useAppSelector(state => state.createPost.croppedImages)

  return <CroppedImage addedImages={images} />
}
