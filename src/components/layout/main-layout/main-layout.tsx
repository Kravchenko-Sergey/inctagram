import React, { ReactElement, ReactNode } from 'react'

import s from './main-layout.module.scss'

import { Header } from '@/components/header'
import { getSidebarLayout } from '@/components/layout/sidebar-layout/sidebar-layout'
type LayoutProps = {
  className?: string
  children?: ReactNode
}

const MainLayout = ({ className, children }: LayoutProps) => {
  const WrappedComponent = getSidebarLayout(children)

  return (
    <div className={className}>
      <Header />
      <div className={s.flexContainer}>{WrappedComponent}</div>
      {/*{authorized && <Footer />}*/}
    </div>
  )
}

export const getMainLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
