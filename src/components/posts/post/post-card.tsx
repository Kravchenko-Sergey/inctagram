import { useState } from 'react'
import Image from 'next/image'

import { ViewPostModal } from '../view'
import { useLazyGetUserPostQuery } from '@/services/posts'

import s from './post.module.scss'

type PropsType = {
  post: any
}

export const PostCard = ({ post }: PropsType) => {
  const [getPost] = useLazyGetUserPostQuery()

  const [isViewMode, setIsViewMode] = useState(false)

  const handleModalChange = (value: boolean) => setIsViewMode(value)

  const handleViewPost = async () => {
    await getPost({ postId: post.id }).unwrap()
    handleModalChange(true)
  }

  return (
    <>
      <Image
        onClick={handleViewPost}
        src={post?.images[0]?.url}
        alt={`post ${post.id} image`}
        width={234}
        height={228}
        className={s.post}
      />
      <ViewPostModal post={post} isOpen={isViewMode} handleModalChange={handleModalChange} />
    </>
  )
}
