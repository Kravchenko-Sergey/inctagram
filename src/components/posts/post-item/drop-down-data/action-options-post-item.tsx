import * as DropdownRadixMenu from '@radix-ui/react-dropdown-menu'

import { Copy, EditPencilIcon, Follow, TrashIcon, Unfollow } from '@/assets/icons'
import { Typography } from '@/components'
import { useTranslation } from '@/hooks'

import s from './action-options-post-item.module.scss'

type PropsType = {
  handlerFollow: () => void
  handleCopyLink: () => void
  follow?: boolean
}

export const ActionOptionsPostItem = ({ handlerFollow, handleCopyLink, follow }: PropsType) => {
  // todo need refactor
  const { t } = useTranslation()

  return (
    <>
      <DropdownRadixMenu.Item className={s.item} onClick={handlerFollow}>
        {follow ? <Unfollow /> : <Follow />}
        <Typography variant="regular_text_14">
          {follow ? t.homeAuth.follow : t.homeAuth.unfollow}
        </Typography>
      </DropdownRadixMenu.Item>
      <DropdownRadixMenu.Item className={s.item} onClick={handleCopyLink}>
        <Copy />
        <Typography variant="regular_text_14">{t.homeAuth.copyLink}</Typography>
      </DropdownRadixMenu.Item>
    </>
  )
}
