import { useAppDispatch, useAppSelector } from '@/services'
import { setFilter } from '@/components/posts/create/create-post-slice'
import { SelectedImages } from '@/components/posts/create/edit-photo'

export const FilterPage = () => {
  const dispatch = useAppDispatch()
  const addedImages = useAppSelector(state => state.createPost.croppedImages)
  const onChangeFilter = (filter: string, id: number) => dispatch(setFilter({ id, filter }))

  return <SelectedImages addedImages={addedImages} onChangeFilter={onChangeFilter} />
}
