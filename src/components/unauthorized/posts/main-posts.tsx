import React, { memo } from 'react'
import styles from './main-posts.module.scss'
import { AmountUsers } from '@/components/unauthorized/posts/amount-users'
import { PostItem } from '@/components/unauthorized/posts/post-item'

export const MainPosts = memo(() => {
  return (
    <div className={styles.root}>
      <AmountUsers />
      <PostItem />
    </div>
  )
})
