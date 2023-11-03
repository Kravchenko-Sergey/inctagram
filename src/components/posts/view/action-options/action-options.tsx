import * as DropdownRadixMenu from '@radix-ui/react-dropdown-menu'

import { EditPencilIcon, TrashIcon } from '@/assets/icons'
import { Typography } from '@/components'
import { useTranslation } from '@/hooks'
import { Post, useDeleteUserPostMutation } from '@/services/posts'

import s from './action-options.module.scss'

type PropsType = {
  post: Post
  handleOpenEditMode: () => void
}

export const ActionOptions = ({ post, handleOpenEditMode }: PropsType) => {
  const { t } = useTranslation()
  const [deletePost] = useDeleteUserPostMutation()

  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: post.id }).unwrap()
    } catch (error: unknown) {
      console.error(`Some error occured when delete post with id ${post.id}, ${error}`)
    }
  }

  return (
    <>
      <DropdownRadixMenu.Item className={s.item} onClick={handleOpenEditMode}>
        <EditPencilIcon />
        <Typography variant="regular_text_14">{t.post.editPost}</Typography>
      </DropdownRadixMenu.Item>
      <DropdownRadixMenu.Item className={s.item} onClick={handleDeletePost}>
        <TrashIcon />
        <Typography variant="regular_text_14">{t.post.deletePost}</Typography>
      </DropdownRadixMenu.Item>
    </>
  )
}
