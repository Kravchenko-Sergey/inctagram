import React, { useState } from 'react'
import { Tabs } from '@/components'
import { TabsContent } from '@/components/ui/tabs/tabs'
import { PATH } from '@/consts/route-paths'
import { useRouter } from 'next/router'
import { useTranslation } from '@/hooks'
import s from './settings-tab.module.scss'

export const SettingsTab = () => {
  const { t } = useTranslation()

  const profileTabs = [
    { value: PATH.PROFILE_GENERAL, label: t.profile.generalInfo, disabled: false },
    { value: PATH.PROFILE_DEVICE, label: t.profile.devices, disabled: false },
    { value: PATH.PROFILE_ACCOUNT, label: t.profile.accManagement, disabled: false },
    { value: PATH.PROFILE_PAYMENTS, label: t.profile.myPayments, disabled: false },
  ]

  const { route, push } = useRouter()

  const [tabsValue, setTabsValue] = useState(route)

  const onChangeTabs = (route: string) => {
    setTabsValue(route)
    push(route)
  }

  return (
    <Tabs tabs={profileTabs} value={tabsValue} onValueChange={onChangeTabs} className={s.root}>
      {profileTabs.map(item => (
        <TabsContent
          key={item.value}
          className={route === item.value ? s.active : ''}
          value={item.value}
        />
      ))}
    </Tabs>
  )
}
