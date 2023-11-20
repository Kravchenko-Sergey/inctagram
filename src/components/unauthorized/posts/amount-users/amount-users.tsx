import React, { memo } from 'react'
import s from './amount-users.module.scss'
import { Typography } from '@/components'

export const AmountUsers = memo(() => {
  const data = 177777
  const numberItems = data.toString().split('')

  return (
    <div className={s.root}>
      <Typography variant="h2">Registered users:</Typography>
      <div className={s.counter}>
        {numberItems.map((digit, index) => (
          <div key={index} className={s.digit}>
            <Typography variant="h2">{digit}</Typography>
          </div>
        ))}
      </div>
    </div>
  )
})
