import React, { memo } from 'react'
import styles from './main-posts.module.scss'
import { AmountUsers } from '@/components/unauthorized/posts/amount-users'
import { PostItem } from '@/components/unauthorized/posts/post-item'
import { GetLastCreatedPostsResponse } from '@/services/public-posts/types'

type Props = {
  posts: GetLastCreatedPostsResponse
}

export const MainPosts = memo(({ posts }: Props) => {
  if (!posts) return

  return (
    <div className={styles.root}>
      <AmountUsers amounts={posts.totalUsers} />
      <div className={styles.itemWrapper}>
        {posts.items.map(item => (
          <PostItem key={item.id} post={item} />
        ))}
      </div>
    </div>
  )
})
