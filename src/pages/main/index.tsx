import React from 'react'
import s from './main-page.module.scss'
import { getHeaderUnauthorizedLayout } from '@/components/layout'
import { HeadMeta } from '@/components'
import { wrapper } from '@/services'
import { getLastCreatedPosts, getRunningQueriesThunk } from '@/services/public-posts'
import { NextPageWithLayout } from '@/pages/_app'
import { MainPosts } from '@/components/unauthorized/posts'

export const getStaticProps = wrapper.getStaticProps(store => async context => {
  const result = await store.dispatch(
    getLastCreatedPosts.initiate({ pageSize: 4, sortDirection: 'desc', sortBy: 'createdAt' })
  )
  // const UserId = await store.dispatch(getProfileData.initiate({}))

  // store.dispatch(getUsersAmount.initiate())
  // const data = await getLastCreatedPosts.initiate({ pageSize: 4, sortDirection: 'desc' })
  if (!result) {
    return {
      notFound: true,
    }
  }
  // store.dispatch(
  //   getLastCreatedPosts.initiate({ pageSize: 4, sortDirection: 'desc', sortBy: 'createdAt' })
  // )
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: { result },
    revalidate: 60,
  }
})

export const MainPage: NextPageWithLayout = (props: any) => {
  return (
    <>
      <HeadMeta title="Main Page" />
      <div className={s.root}>
        <MainPosts posts={props.result.data.items} />
      </div>
    </>
  )
}

MainPage.getLayout = getHeaderUnauthorizedLayout
export default MainPage
