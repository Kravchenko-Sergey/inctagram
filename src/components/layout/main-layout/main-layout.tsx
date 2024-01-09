import { ReactElement, ReactNode } from 'react'

import { getSidebarLayout, Header } from '@/components'

import s from './main-layout.module.scss'

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

// export const getMainLayout = (page: ReactElement) => {
export const getMainLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}
