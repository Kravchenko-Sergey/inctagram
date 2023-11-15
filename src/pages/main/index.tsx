import React from 'react'
import s from './main-page.module.scss'
import { getHeaderUnauthorizedLayout } from '@/components/layout'
import { HeadMeta } from '@/components'
import { AmountUsers } from '@/components/unauthorized/posts/amount-users'

export const MainPage = () => {
  return (
    <>
      <HeadMeta title="Main Page" />
      <div className={s.root}>
        <AmountUsers />
      </div>
    </>
  )
}

MainPage.getLayout = getHeaderUnauthorizedLayout
export default MainPage
