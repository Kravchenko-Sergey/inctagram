import * as DropdownRadixMenu from '@radix-ui/react-dropdown-menu'

import { EditPencilIcon, TrashIcon } from '@/assets/icons'
import { Typography } from '@/components'
import { useTranslation } from '@/hooks'
import { Post } from '@/services/posts'

import s from './action-options.module.scss'

type PropsType = {
  post: Post
  handleOpenEditMode: () => void
  handleDeleteMode: () => void
}

export const ActionOptions = ({ post, handleOpenEditMode, handleDeleteMode }: PropsType) => {
  const { t } = useTranslation()

  return (
    <>
      <DropdownRadixMenu.Item className={s.item} onClick={handleOpenEditMode}>
        <EditPencilIcon />
        <Typography variant="regular_text_14">{t.post.editPost}</Typography>
      </DropdownRadixMenu.Item>
      <DropdownRadixMenu.Item className={s.item} onClick={handleDeleteMode}>
        <TrashIcon />
        <Typography variant="regular_text_14">{t.post.deletePost}</Typography>
      </DropdownRadixMenu.Item>
    </>
  )
}
