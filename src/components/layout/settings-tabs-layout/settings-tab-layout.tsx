import { ReactNode } from 'react'
import { getMainLayout } from '@/components'
import { SettingsTab } from '@/components/profile/settings-tab/settings-tab'
import s from './settings-tab-layout.module.scss'

type SettingsTabLayoutProps = {
  className?: string
  children?: ReactNode
}

const SettingsTabLayout = ({ children }: SettingsTabLayoutProps) => {
  const WrappedComponent = getMainLayout(
    <div className={s.root}>
      <SettingsTab />
      {children}
    </div>
  )

  return <>{WrappedComponent}</>
}

export const getSettingsTabLayout = (page: ReactNode) => {
  return <SettingsTabLayout>{page}</SettingsTabLayout>
}
