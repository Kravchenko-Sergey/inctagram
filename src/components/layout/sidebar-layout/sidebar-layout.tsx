import { FC, ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Sidebar, Typography } from '@/components'
import { sidebarItems } from '@/consts/sidebar-routes'

import s from '@/components/layout/main-layout/main-layout.module.scss'

type SidebarLayoutProps = {
  className?: string
  children?: ReactNode
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${s.item} ${router.pathname === item.href ? s.active : ''}`}
          >
            <>
              {item.icon}
              <Typography color="inherit">{item.title}</Typography>
            </>
          </Link>
        ))}
      </Sidebar>
      {children}
    </>
  )
}

export const getSidebarLayout = (page: ReactNode) => {
  return <SidebarLayout>{page}</SidebarLayout>
}
