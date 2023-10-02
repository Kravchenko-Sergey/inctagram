import React, { FC, ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/components/layout/main-layout/main-layout.module.scss'
import { Sidebar } from '@/components/sidebar'
import { Typography } from '@/components/typography'
import { sidebarItems } from '@/consts/sidebar-routes'

type SidebarLayoutProps = {
  className?: string
  children?: ReactNode
}

export const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
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
