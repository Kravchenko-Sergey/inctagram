import React, { memo, useState } from 'react'
import Image from 'next/image'
import { Avatar, Typography } from '@/components'
import { Post, PostImageType } from '@/services/posts'
import { useTimeAgo, useTranslation } from '@/hooks'
import { filterImagesOnly1440 } from '@/helpers/filterImagesOnly1440'
import empty from '@/assets/images/empty.gif'
import { getSliderSettings } from '@/helpers'
import Slider from 'react-slick'
import ShowMoreText from 'react-show-more-text'
import s from './post-item.module.scss'
import { Block } from '@/assets/icons'
import { PATH } from '@/consts/route-paths'
import { useRouter } from 'next/router'
import defaultPostImage from './../../../../../public/image/post-image.png'

type Props = {
  post: Post
}
export const PostItem = memo(({ post }: Props) => {
  const settings = getSliderSettings(s.dots)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { t } = useTranslation()
  const { push } = useRouter()

  const collapsedTextHandler = () => {
    setIsCollapsed(!isCollapsed)
  }

  const postClickHandler = () => {
    push(`${PATH.PROFILE}/?id=${post.ownerId}&postId=${post.id}`)
  }

  console.log('value')

  return (
    <div className={s.root} onClick={postClickHandler}>
      {post.images.length === 0 ? (
        <div>
          <Image
            src={defaultPostImage}
            className={`${s.image} ${isCollapsed ? s.imageCollapsed : ''}`}
            width={234}
            height={240}
            alt="Post image"
          />
        </div>
      ) : (
        <div>
          <Slider {...settings}>
            {filterImagesOnly1440(post.images).map((image: PostImageType) => {
              return (
                <div className={s.item} key={image.uploadId}>
                  <Image
                    src={image.url ? image.url : empty}
                    className={`${s.image} ${isCollapsed ? s.imageCollapsed : ''}`}
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
        <div className={s.footerInfo}>
          <Typography variant="h3">{`${post.owner.firstName} ${post.owner.lastName}`}</Typography>
          {isCollapsed && <Block />}
        </div>
      </div>
      <Typography color="secondary" className={s.status} variant="small_text">
        {useTimeAgo(post.createdAt)}
      </Typography>
      <div className={s.desc}>
        <ShowMoreText
          lines={2}
          more={t.showMore}
          less={t.hide}
          className={`${s.rootDesc} ${isCollapsed ? s.scrolled : ''}`}
          anchorClass={s.anchor}
          onClick={collapsedTextHandler}
          expanded={false}
          // width={140}
          width={0}
        >
          {post.description}
        </ShowMoreText>
      </div>
    </div>
  )
})
