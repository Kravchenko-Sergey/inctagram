import { FC, ReactElement, ReactNode } from 'react'

import { Header } from '@/components'

type HeaderLayoutProps = {
  className?: string
  children?: ReactNode
}

const HeaderLayout: FC<HeaderLayoutProps> = ({ children, className }) => {
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
