import { FC, ReactNode, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, Modal, Sidebar, Typography } from '@/components'

import s from '@/components/layout/main-layout/main-layout.module.scss'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.api'
import {
  BookmarkOutline,
  HomeOutline,
  LogOutOutline,
  MessageCircleOutline,
  PersonOutline,
  SearchIcon,
  TrendingUpOutline,
} from '@/assets/icons'
import { useTranslation } from '@/hooks'
import { PATH } from '@/consts/route-paths'

type SidebarLayoutProps = {
  className?: string
  children?: ReactNode
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const router = useRouter()
  const [logOut] = useLogoutMutation()
  const [modalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation()
  const { data: me } = useMeQuery()
  const sidebarItems = [
    { href: PATH.HOME, icon: <HomeOutline />, title: t.sidebars.home },
    // { href: PATH.REGISTRATION, icon: <PlusSquareOutline />, title: 'Registration' },
    // { href: PATH.LOGIN, icon: <PlusSquareOutline />, title: 'Login' },
    { href: PATH.PROFILE, icon: <PersonOutline />, title: t.sidebars.myProfile },
    { href: PATH.MESSENGER, icon: <MessageCircleOutline />, title: t.sidebars.messenger },
    { href: PATH.SEARCH, icon: <SearchIcon />, title: t.sidebars.search },
    { href: PATH.STATISTIC, icon: <TrendingUpOutline />, title: t.sidebars.statistics },
    { href: PATH.FAVORITES, icon: <BookmarkOutline />, title: t.sidebars.favorites },
    // { href: PATH.CONFIRM, icon: <BookmarkOutline />, title: 'Confirm' },
    // { href: PATH.LOGOUT, icon: <LogOutOutline />, title: 'Log Out' },
  ]
  const handleModalSubmit = async () => {
    await logOut().unwrap()
    router.push(PATH.LOGIN)
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
          <div key={index}>
            <Link
              href={item.href}
              className={`${s.item} ${router.pathname === item.href ? s.active : ''}`}
            >
              <>
                {item.icon}
                <Typography color="inherit">{item.title}</Typography>
              </>
            </Link>
          </div>
        ))}
        <div className={s.logout}>
          <LogOutOutline color={'inherit'} />
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
