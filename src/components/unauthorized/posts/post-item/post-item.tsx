import React, { memo } from 'react'
import s from './post-item.module.scss'
import Image from 'next/image'

export const PostItem = memo(() => {
  const data = {}

  return (
    <div className={s.root}>
      <Image src={data.url} width={234} height={240} alt="" />
    </div>
  )
})
