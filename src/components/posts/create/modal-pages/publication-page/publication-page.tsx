import { useAppSelector } from '@/services'
import { FilteredImages, PostDescription } from '@/components/posts/create/add-description'
import s from './publication-page.module.scss'

export const PublicationPage = () => {
  const filteredImages = useAppSelector(state => state.createPost.croppedImages)

  return (
    <div className={s.container}>
      <FilteredImages addedImages={filteredImages} />
      <PostDescription addedImages={filteredImages} />
    </div>
  )
}
