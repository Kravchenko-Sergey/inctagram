import { ReactNode, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, Modal, Sidebar, Typography } from '@/components'

import s from '@/components/layout/main-layout/main-layout.module.scss'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth-api'
import {
  BookmarkOutline,
  HomeOutline,
  LogOutOutline,
  MessageCircleOutline,
  PersonOutline,
  PlusSquareOutline,
  SearchIcon,
  TrendingUpOutline,
} from '@/assets/icons'
import { useTranslation } from '@/hooks'
import { PATH } from '@/consts/route-paths'

type SidebarLayoutProps = {
  className?: string
  children?: ReactNode
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const { data: me } = useMeQuery()
  const [logOut] = useLogoutMutation()
  const sidebarItems = [
    { href: PATH.HOME, icon: <HomeOutline />, title: t.sidebars.home },
    { href: `${PATH.PROFILE}/${me?.userId}`, icon: <PersonOutline />, title: t.sidebars.myProfile },

    // { href: PATH.PROFILE, icon: <PersonOutline />, title: t.sidebars.myProfile },
    { href: PATH.CREATE, icon: <PlusSquareOutline />, title: t.sidebars.create },
    { href: PATH.MESSENGER, icon: <MessageCircleOutline />, title: t.sidebars.messenger },
    { href: PATH.SEARCH, icon: <SearchIcon />, title: t.sidebars.search },
    {
      href: PATH.STATISTIC,
      icon: <TrendingUpOutline />,
      title: t.sidebars.statistics,
      className: s.statisticsItem,
    },
    { href: PATH.FAVORITES, icon: <BookmarkOutline />, title: t.sidebars.favorites },
  ]
  const handleModalSubmit = async () => {
    await logOut()
    router.push(PATH.MAIN)
  }
  const handleModalClosed = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal isOpen={modalOpen} className={s.modalContent} title={t.profile.titleLogOut}>
        <Typography variant="regular_text_16">
          {t.profile.logOut}
          <Typography as="span" variant="bold_text_16">
            {me?.email}
          </Typography>
          ?
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 24 }}>
          <Button onClick={handleModalSubmit} variant="ghost">
            Yes
          </Button>
          <Button onClick={handleModalClosed} variant="primary">
            No
          </Button>
        </div>
      </Modal>
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${item.className ? item.className : s.item} ${
              router.pathname === item.href ? s.active : ''
            }`}
          >
            <>
              {item.icon}
              <Typography color="inherit">{item.title}</Typography>
            </>
          </Link>
        ))}
        <div className={s.logout}>
          <LogOutOutline color="inherit" />
          <Typography onClick={() => setModalOpen(!modalOpen)} color="inherit">
            {t.sidebars.logout}
          </Typography>
        </div>
      </Sidebar>
      {children}
    </>
  )
}

export const getSidebarLayout = (page: ReactNode) => {
  return <SidebarLayout>{page}</SidebarLayout>
}
