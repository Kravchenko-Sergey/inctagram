import React, { memo } from 'react'
import s from './likes.module.scss'
import { Avatar } from '@/components'

type Props = {
  props: { icons: string[] }
}

const styles: { [key: number]: string } = {
  0: `${s.avatar0}`,
  1: `${s.avatar1}`,
  2: `${s.avatar2}`,
}

export const Likes = memo(({ props }: Props) => {
  return (
    <div className={s.root}>
      <div>
        {props.icons.slice(0, 3).map((item, index) => (
          <Avatar key={index} photo={item} size={24} className={`${styles[index]}`} />
        ))}
      </div>
    </div>
  )
})
