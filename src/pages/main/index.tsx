import React from 'react'
import s from './main-page.module.scss'
import { getHeaderUnauthorizedLayout } from '@/components/layout'
import { HeadMeta } from '@/components'
import { AmountUsers } from '@/components/unauthorized/posts/amount-users'
import { wrapper } from '@/services'
import {
  getLastCreatedPosts,
  getRunningQueriesThunk,
  getUsersAmount,
} from '@/services/public-posts'
import { NextPageWithLayout } from '@/pages/_app'
import { PostItem } from '@/components/unauthorized/posts/post-item'
import { MainPosts } from '@/components/unauthorized/posts'
//static props
export const getStaticProps = wrapper.getStaticProps(store => async context => {
  store.dispatch(getLastCreatedPosts.initiate())
  store.dispatch(getUsersAmount.initiate())

  // if () {
  //   return {
  //     notFound: true
  //   };
  // }
  // await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
    // revalidate: 60,
  }
})

export const MainPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title="Main Page" />
      <div className={s.root}>
        <MainPosts />
      </div>
    </>
  )
}

MainPage.getLayout = getHeaderUnauthorizedLayout
export default MainPage
