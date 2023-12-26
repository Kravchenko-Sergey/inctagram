import { useAppSelector } from '@/services'
import { FilteredImages, PostDescription } from '@/components/posts/create/add-description'

export const PublicationPage = () => {
  const filteredImages = useAppSelector(state => state.createPost.croppedImages)

  return (
    <div style={{ display: 'flex' }}>
      <FilteredImages addedImages={filteredImages} />
      <PostDescription addedImages={filteredImages} />
    </div>
  )
}
