import * as AvatarRadix from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

type AvatarPropsType = {
  name?: string
  photo?: string
  size?: number
}

export const Avatar = ({ name = 'Your avatar', photo, size = 198 }: AvatarPropsType) => {
  function getFirstLetter(name: string | undefined) {
    return name?.charAt(0).toUpperCase()
  }

  return (
    <AvatarRadix.Root className={s.avatarRoot}>
      <AvatarRadix.Image
        width={size}
        height={size}
        src={photo}
        className={s.avatarImage}
        alt={`${name} avatar`}
        title={`${name} avatar`}
      />
      <AvatarRadix.Fallback
        style={{ height: `${size}px`, width: `${size}px` }}
        className={s.avatarFallback}
      >
        {getFirstLetter(name)}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
