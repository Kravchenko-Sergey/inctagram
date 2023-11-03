import { ReactElement, ReactNode } from 'react'

import { Header } from '@/components'

type HeaderLayoutProps = {
  className?: string
  children?: ReactNode
}

const HeaderLayout = ({ children, className }: HeaderLayoutProps) => {
  return (
    <div className={className}>
      <Header />
      {children}
    </div>
  )
}

export const getHeaderLayout = (page: ReactElement) => {
  return <HeaderLayout>{page}</HeaderLayout>
}
