import React, { memo } from 'react'
import styles from './main-posts.module.scss'
import { AmountUsers } from '@/components/unauthorized/posts/amount-users'
import { PostItem } from '@/components/unauthorized/posts/post-item'
import { Post } from '@/services/posts'

type Props = {
  posts: Post[]
}

export const MainPosts = memo(({ posts }: Props) => {
  // const { data } = useGetLastCreatedPostsQuery({ pageSize: 4, sortDirection: 'desc' })
  //
  // console.log('posts', data)

  return (
    <div className={styles.root}>
      <AmountUsers />
      <div className={styles.itemWrapper}>
        {posts.map(item => (
          <PostItem key={item.id} post={item} />
        ))}
      </div>
    </div>
  )
})
