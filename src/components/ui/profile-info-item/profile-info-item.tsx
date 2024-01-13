import React, { memo } from 'react'
import { Typography } from '@/components'

type Props = {
  number: number
  item: string | undefined
}

export const ProfileInfoItem = memo(({ item, number }: Props) => {
  return (
    <div>
      <Typography>{number}</Typography>
      <Typography>{item}</Typography>
    </div>
  )
})
