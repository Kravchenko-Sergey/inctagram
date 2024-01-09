import { Avatar, DropdownMenu, Typography } from '@/components'
import { ActionOptions } from '../action-options'

import s from './post-modal-header.module.scss'

type PostHeaderPropsType = {
  userName?: string
  avatar?: string
  handleOpenEditMode: () => void
  handleDeleteMode: () => void
  isMyPage?: boolean
}

export const PostModalHeader = ({
  userName,
  avatar,
  handleOpenEditMode,
  handleDeleteMode,
  isMyPage,
}: PostHeaderPropsType) => {
  return (
    <div className={s.header}>
      <div className={s.userInfo}>
        <Avatar photo={avatar} size={36} />
        <Typography variant="h3">{userName}</Typography>
      </div>
      {isMyPage && (
        <DropdownMenu sideOffset={-5}>
          <ActionOptions
            handleOpenEditMode={handleOpenEditMode}
            handleDeleteMode={handleDeleteMode}
          />
        </DropdownMenu>
      )}
    </div>
  )
}
