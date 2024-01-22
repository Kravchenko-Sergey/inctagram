import { useState } from 'react'
import Image from 'next/image'

import { ViewPostModal } from '../view'
import defaultPostImage from './../../../../public/image/post-image.png'
import s from './post.module.scss'
import { filterImagesOnly1440 } from '@/helpers/filterImagesOnly1440'
import { PostProfile, useLazyGetPublicPostQuery } from '@/services/public-posts'
import { useMeQuery } from '@/services/auth'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'

type PropsType = {
  // post: Post
  post: PostProfile
}

export const PostCard = ({ post }: PropsType) => {
  const [getPost, { data }] = useLazyGetPublicPostQuery()
  const { data: me } = useMeQuery()
  const { push } = useRouter()

  const [isViewMode, setIsViewMode] = useState(false)

  const handleViewPost = async () => {
    if (me) {
      try {
        await getPost({ postId: post.id }).unwrap()
        setIsViewMode(true)
      } catch (error: unknown) {
        console.log(`When open post with id ${post.id} an error has occured`, error)
      }
    } else {
      push(`${PATH.PROFILE}/?id=${post.ownerId}&postId=${post.id}`)
    }
  }
  const imagesURI = filterImagesOnly1440(post?.images)
  const imageUrl = imagesURI[0]?.url || defaultPostImage

  return (
    <>
      <Image
        onClick={handleViewPost}
        src={imageUrl}
        alt={`post ${post.id} image`}
        width={232}
        height={228}
        className={s.post}
      />
      {data && <ViewPostModal post={post} isOpen={isViewMode} handleModalChange={setIsViewMode} />}
    </>
  )
}
