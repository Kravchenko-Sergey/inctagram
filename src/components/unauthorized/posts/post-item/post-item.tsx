import React, { memo } from 'react'
import s from './post-item.module.scss'
import Image from 'next/image'
import { Avatar, Typography } from '@/components'

export const PostItem = memo(() => {
  const data = {
    url: 'https://storage.yandexcloud.net/users-inctagram/users/64/post/188bf2c9-c346-4583-8e4a-79940da77d91-images-1440x1440',
    avatar: 'https://pbs.twimg.com/media/F_EXFAtWYAA2w7k?format=jpg&name=large',
    userName: 'Pavel',
    status: '22 min ago',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incd',
  }

  return (
    <div className={s.root}>
      <Image src={data.url} className={s.image} width={234} height={240} alt="" />
      <div className={s.header}>
        <Avatar size={36} photo={data.avatar} />
        <Typography variant="h3">{data.userName}</Typography>
      </div>
      <Typography color="secondary" className={s.status} variant="small_text">
        {data.status}
      </Typography>
      <Typography variant="regular_text_14">{data.text}</Typography>
    </div>
  )
})
