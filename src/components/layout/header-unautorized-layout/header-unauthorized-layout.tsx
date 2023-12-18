import { ReactElement, ReactNode } from 'react'

import { Header } from '@/components'

type HeaderLayoutUnauthorizedProps = {
  className?: string
  children?: ReactNode
}

export const HeaderUnauthorizedLayout = ({
  children,
  className,
}: HeaderLayoutUnauthorizedProps) => {
  return (
    <div className={className}>
      <Header unauthorized />
      {children}
    </div>
  )
}

export const getHeaderUnauthorizedLayout = (page: ReactElement) => {
  return <HeaderUnauthorizedLayout>{page}</HeaderUnauthorizedLayout>
}
