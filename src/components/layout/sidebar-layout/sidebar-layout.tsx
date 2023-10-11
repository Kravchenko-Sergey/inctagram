import { FC, ReactNode, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button, Modal, Sidebar, Typography } from '@/components'
import { sidebarItems } from '@/consts/sidebar-routes'

import s from '@/components/layout/main-layout/main-layout.module.scss'
import { useLogoutMutation, useMeQuery } from '@/api/auth-api/auth.api'
import { LogOutOutline } from '@/assets/icons'
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

  const handleModalClosed = async () => {
    setModalOpen(false)
    await logOut().unwrap()
    localStorage.clear()
    router.push(PATH.LOGIN)
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
          <Button onClick={handleModalClosed} variant="ghost">
            Yes
          </Button>
          <Button onClick={handleModalClosed} variant="primary">
            No
          </Button>
        </div>
      </Modal>
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <>
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
          </>
        ))}
        <div className={s.logout}>
          <LogOutOutline color={'inherit'} />
          <Typography onClick={() => setModalOpen(!modalOpen)} color="inherit">
            Log Out
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
