import React, { memo } from 'react'
import s from './amount-users.module.scss'
import { Typography } from '@/components'
import { processNumber } from '@/helpers'

type Props = {
  amounts: number
}

export const AmountUsers = memo(({ amounts }: Props) => {
  return (
    <div className={s.root}>
      <Typography variant="h2">Registered users:</Typography>
      <div className={s.counter}>
        {processNumber(amounts).map((digit, index) => (
          <div key={index} className={s.digit}>
            <Typography variant="h2">{digit}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
})
