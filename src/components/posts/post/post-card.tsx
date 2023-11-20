import { useState } from 'react'
import Image from 'next/image'

import { ViewPostModal } from '../view'
import { Post, useLazyGetUserPostQuery } from '@/services/posts'

import s from './post.module.scss'
import { sortImagesByWidth } from '@/helpers/filterImages'

type PropsType = {
  post: Post
}

export const PostCard = ({ post }: PropsType) => {
  const [getPost] = useLazyGetUserPostQuery()

  const [isViewMode, setIsViewMode] = useState(false)

  const handleViewPost = async () => {
    try {
      await getPost({ postId: post.id }).unwrap()
      setIsViewMode(true)
    } catch (error: unknown) {
      console.log(`When open post with id ${post.id} an error has occured`, error)
    }
  }

  return (
    <>
      <Image
        onClick={handleViewPost}
        src={sortImagesByWidth(post?.images)[1].url}
        alt={`post ${post.id} image`}
        width={234}
        height={228}
        className={s.post}
      />
      <ViewPostModal post={post} isOpen={isViewMode} handleModalChange={setIsViewMode} />
    </>
  )
}
