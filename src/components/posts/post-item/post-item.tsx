import React, { ReactElement } from 'react'
import { Post, PostImageType } from '@/services/posts'
import s from './post-item.module.scss'
import Image from 'next/image'
import { getSliderSettings } from '@/helpers'
import Slider from 'react-slick'
import { filterImagesOnly1440 } from '@/helpers/filterImagesOnly1440'
import empty from '@/assets/images/empty.gif'
import { Avatar, Button, ControlledTextArea, DropdownMenu, Likes, Typography } from '@/components'
import { Favorites, Heart, Comment, Answer } from '@/assets/icons'
import { useTimeAgo, useTranslation } from '@/hooks'
import { ActionOptionsPostItem } from '@/components/posts/post-item/drop-down-data/action-options-post-item'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostItemFormType, postItemSchema } from '@/schemas/post-item-schema'
import defaultPostImage from './../../../../public/image/post-image.png'

type Props = {
  post: Post
}
export const PostItem = ({ post }: Props) => {
  const { t } = useTranslation()
  // const { data: me, isLoading } = useMeQuery()
  const { reset, handleSubmit, control } = useForm<PostItemFormType>({
    resolver: zodResolver(postItemSchema()),
    mode: 'onChange',
  })
  // const { data } = useGetUsersFollowersDataQuery({ userName: me?.userName!, cursor: 10 })
  // // todo узнать у Насти как правильно с ми
  //
  // console.log('me', me)
  // console.log('data', data)

  const dotsWrap = {
    appendDots: (dots: ReactElement) => (
      <div
        style={{
          borderRadius: '10px',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          background: 'none',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: 'var(--dark-300)',
            width: 'auto',
          }}
        >
          <ul style={{ margin: '0px' }}> {dots} </ul>
        </div>
      </div>
    ),
  }

  const settings = getSliderSettings(s.dots, dotsWrap)

  const fakeProps = {
    icons: [post?.avatarOwner, post?.avatarOwner, post?.avatarOwner, post?.avatarOwner],
    numOfLikes: 3333,
    ownerId: 5,
  }

  const onSubmit = (data: PostItemFormType) => {
    console.log('data', data)
  }
  const handleCopyLink = (value: string) => {
    const url = window.location.href

    navigator.clipboard.writeText(`${url}${value}`)
  }
  const postCreated = useTimeAgo(post?.createdAt)

  return (
    <div className={s.root}>
      {/*<div className={s.header}>*/}
      {/*  <Avatar className={s.avatar} size={36} photo={post?.avatarOwner} />*/}
      {/*  <Typography>{post?.userName}</Typography>*/}
      {/*  <div className={s.circle} />*/}
      {/*  <Typography color={'secondary'} className={s.ago}>*/}
      {/*    {postCreated}*/}
      {/*  </Typography>*/}
      {/*  <DropdownMenu className={s.dropdown}>*/}
      {/*    <ActionOptionsPostItem*/}
      {/*      follow*/}
      {/*      handlerFollow={() => {}}*/}
      {/*      handleCopyLink={() => handleCopyLink(`/profile?id=${fakeProps.ownerId}`)}*/}
      {/*    />*/}
      {/*  </DropdownMenu>*/}
      {/*</div>*/}
      {/*<div className={s.slider}>*/}
      {/*  {post && post.images ? (*/}
      {/*    <Slider {...settings}>*/}
      {/*      {filterImagesOnly1440(post?.images)?.map((image: PostImageType) => {*/}
      {/*        return (*/}
      {/*          <div key={image.uploadId} onClick={() => {}}>*/}
      {/*            <Image*/}
      {/*              className={s.image}*/}
      {/*              src={image.url ? image.url : empty}*/}
      {/*              width={234}*/}
      {/*              height={240}*/}
      {/*              alt="Post image"*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </Slider>*/}
      {/*  ) : (*/}
      {/*    <Image src={defaultPostImage} alt="Post image" width={234} height={240} />*/}
      {/*  )}*/}
      {/*</div>*/}
      {/*<div className={s.info}>*/}
      {/*  <div className={s.icons}>*/}
      {/*    <div className={s.mainIcons}>*/}
      {/*      <Heart className={s.icon} />*/}
      {/*      <Comment className={s.icon} />*/}
      {/*      <Answer className={s.icon} />*/}
      {/*    </div>*/}
      {/*    <Favorites className={s.icon} />*/}
      {/*  </div>*/}
      {/*  <div className={s.textItem}>*/}
      {/*    <Avatar size={36} photo={post.avatarOwner} className={s.textItemAvatar} />*/}
      {/*    <div className={s.textBlock}>*/}
      {/*      <Typography variant={'regular_text_14'}>*/}
      {/*        <Typography as={'span'} variant={'bold_text_14'} className={s.textItemName}>*/}
      {/*          {post.userName}*/}
      {/*        </Typography>*/}
      {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor*/}
      {/*        incididunt ut labore et dolore magna aliqua.*/}
      {/*      </Typography>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={s.likes}>*/}
      {/*    <Likes props={fakeProps} />*/}
      {/*    <Typography style={{ marginRight: '4px' }} variant={'regular_text_14'}>*/}
      {/*      {2222}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant={'bold_text_14'}>&quot;{t.homeAuth.like}&quot;</Typography>*/}
      {/*  </div>*/}
      {/*  <div className={s.comments}>*/}
      {/*    <Typography*/}
      {/*      color={'secondary'}*/}
      {/*      variant={'bold_text_14'}*/}
      {/*    >{`${t.homeAuth.viewAllComments} (114)`}</Typography>*/}
      {/*  </div>*/}
      {/*  <form className={s.footer} onSubmit={handleSubmit(onSubmit)}>*/}
      {/*    <ControlledTextArea*/}
      {/*      autoComplete={'off'}*/}
      {/*      classNameTextArea={s.textArea}*/}
      {/*      className={s.commentInput}*/}
      {/*      placeholder={t.homeAuth.placeholder}*/}
      {/*      name={'comment'}*/}
      {/*      control={control}*/}
      {/*    />*/}
      {/*    <Button type={'submit'} className={s.btn} variant={'link'}>*/}
      {/*      {t.post.addNewPost.publish}*/}
      {/*    </Button>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </div>
  )
}
