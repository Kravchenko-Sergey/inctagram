import { ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

// import s from './../sidebar/sidebar.module.scss'
import s from './main-layout.module.scss'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { Typography } from '@/components/typography'
import { sidebarItems } from '@/consts/sidebar-routes'
type LayoutProps = {
  className?: string
  children?: ReactNode
}

export const MainLayout = ({ className, children }: LayoutProps) => {
  const authorized = false // временный вариант
  const router = useRouter()

  return (
    <div className={className}>
      <Header />
      <div className={s.flexContainer}>
        {/*{authorized && <Sidebar />}*/}
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${s.item} ${router.pathname === item.href ? s.active : ''}`}
            >
              <>
                {item.icon}
                <Typography>{item.title}</Typography>
              </>
            </Link>
          ))}
        </Sidebar>
        {children}
      </div>
      {/*{authorized && <Footer />}*/}
    </div>
  )
}
