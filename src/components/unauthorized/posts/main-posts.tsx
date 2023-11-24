import React, { memo } from 'react'
import styles from './main-posts.module.scss'
import { AmountUsers } from '@/components/unauthorized/posts/amount-users'
import { PostItem } from '@/components/unauthorized/posts/post-item'
import { Post } from '@/services/posts'
import { GetLastCreatedPostsResponse } from '@/services/public-posts/types'

type Props = {
  posts: GetLastCreatedPostsResponse
}

export const MainPosts = memo(({ posts }: Props) => {
  // const { data } = useGetLastCreatedPostsQuery({
  //   pageSize: 4,
  //   sortDirection: 'desc',
  //   sortBy: 'createdAt',
  // })

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
