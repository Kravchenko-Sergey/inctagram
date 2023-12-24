import { ReactNode } from 'react'
import * as AvatarRadix from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'
import { ImageOutline } from '@/assets/icons'

type AvatarPropsType = {
  photo?: string
  size?: number
  defaultImage?: ReactNode
  className?: string
  name?: string
}

export const Avatar = ({
  photo,
  size = 204,
  defaultImage = <ImageOutline />,
  className,
  name,
}: AvatarPropsType) => {
  const rootClass = clsx(s.avatarRoot, className)

  return (
    <AvatarRadix.Root className={rootClass}>
      <AvatarRadix.Image
        width={size}
        height={size}
        src={photo}
        className={s.avatarImage}
        // alt={`${name}:"" avatar`}
        // title={`${name} avatar`}
        alt={` avatar`}
        title={` avatar`}
      />
      <AvatarRadix.Fallback
        style={{ height: `${size}px`, width: `${size}px` }}
        className={s.avatarFallback}
      >
        {defaultImage}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
