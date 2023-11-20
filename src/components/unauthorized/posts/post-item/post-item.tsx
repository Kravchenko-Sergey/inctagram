import React, { memo } from 'react'
import Image from 'next/image'
import { Avatar, Typography } from '@/components'
import { Post, PostImageType } from '@/services/posts'
import { useTimeAgo } from '@/hooks'
import { filterImagesOnly1440 } from '@/helpers/filterImagesOnly1440'
import empty from '@/assets/images/empty.gif'
import { getSliderSettings } from '@/helpers'
import Slider from 'react-slick'
import s from './post-item.module.scss'

type Props = {
  post: Post
}
export const PostItem = memo(({ post }: Props) => {
  const settings = getSliderSettings(s.dots)

  const data = {
    url: 'https://storage.yandexcloud.net/users-inctagram/users/64/post/188bf2c9-c346-4583-8e4a-79940da77d91-images-1440x1440',
    avatar: 'https://pbs.twimg.com/media/F_EXFAtWYAA2w7k?format=jpg&name=large',
    userName: 'Pavel',
    status: '22 min ago',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incd',
  }

  return (
    <div className={s.root}>
      {post.images.length === 0 ? (
        <div>
          <Image src={empty} className={s.image} width={234} height={240} alt="Post image" />
        </div>
      ) : (
        <Slider {...settings}>
          {filterImagesOnly1440(post.images).map((image: PostImageType) => {
            return (
              <div key={image.uploadId}>
                <Image
                  src={image.url ? image.url : empty}
                  className={s.image}
                  width={234}
                  height={240}
                  alt="Post image"
                />
              </div>
            )
          })}
        </Slider>
      )}

      <div className={s.header}>
        <Avatar size={36} photo={data.avatar} />
        <Typography variant="h3">{data.userName}</Typography>
      </div>
      <Typography color="secondary" className={s.status} variant="small_text">
        {useTimeAgo(post.createdAt)}
      </Typography>
      <Typography variant="regular_text_14">{post.description}</Typography>
    </div>
  )
})
