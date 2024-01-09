import { ReactElement, ReactNode } from 'react'

import { getSidebarLayout, Header } from '@/components'

import s from './mixed-layout.module.scss'
import { useMeQuery } from '@/services/auth'
import { HeaderUnauthorizedLayout } from '@/components/layout/header-unautorized-layout/header-unauthorized-layout'
import { TOKEN_LOCAL_STORAGE_KEY } from '@/consts/local-storage'

type LayoutProps = {
  className?: string
  children?: ReactNode
}

const MixedLayout = ({ className, children }: LayoutProps) => {
  const { data: me } = useMeQuery()
  // const accessToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  const WrappedComponent = getSidebarLayout(children)

  return (
    <>
      {me?.userId && (
        <div className={className}>
          <Header />
          <div className={s.flexContainer}>{WrappedComponent}</div>
        </div>
      )}
      {!me?.userId && (
        <div className={className}>
          <Header unauthorized />
          {children}
        </div>
      )}

      {/*// <UnautorizedHeaderLayout>{WrappedComponent}</UnautorizedHeaderLayout>}*/}
      {/*<UnautorizedHeaderLayout>{WrappedComponent}</UnautorizedHeaderLayout>*/}
    </>
  )
}

export const getMixedLayout = (page: ReactElement) => {
  return <MixedLayout>{page}</MixedLayout>
}
