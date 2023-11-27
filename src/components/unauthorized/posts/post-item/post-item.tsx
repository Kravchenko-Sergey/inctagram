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

  return (
    <div className={s.root}>
      {post.images.length === 0 ? (
        <div>
          <Image src={empty} className={s.image} width={234} height={240} alt="Post image" />
        </div>
      ) : (
        <div className={s.aaa}>
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
        </div>
      )}

      <div className={s.header}>
        <Avatar size={36} photo={post.avatarOwner} />
        <Typography variant="h3">{`${post.owner.firstName} ${post.owner.lastName}`}</Typography>
      </div>
      <Typography color="secondary" className={s.status} variant="small_text">
        {useTimeAgo(post.createdAt)}
      </Typography>
      <Typography className={s.desc} variant="regular_text_14">
        {post.description}
      </Typography>
    </div>
  )
})
