import { useGetProfileQuery, useUpdateProfileMutation } from '@/services/profile/profile-api'
import { getMainLayout, ProfileUpdate, Tabs } from '@/components'
import { useTranslation } from '@/hooks'
import { ProfileSettingsFormType } from '@/schemas'
import { toast } from 'react-toastify'

import s from './profile-settings.module.scss'
import { Loader } from '@/components/ui/loader'
import { TabsContent } from '@/components/ui/tabs/tabs'
import { useState } from 'react'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile] = useUpdateProfileMutation()

  const { data: profile, isLoading } = useGetProfileQuery()

  const updateProfileHandler = async (data: ProfileSettingsFormType) => {
    try {
      await updateProfile(data).unwrap()
    } catch (error) {
      // @ts-ignore
      toast.error(`${error?.data.messages[0].message}`, { icon: false })
    }
  }

  const [tabsValue, setTabsValue] = useState('1')
  const onChangeTabs = (tabs: string) => setTabsValue(tabs)

  const profileTabs = [
    { value: '1', label: t.profile.generalInfo, disabled: false },
    { value: '2', label: t.profile.devices, disabled: false },
    { value: '3', label: t.profile.accManagement, disabled: false },
    { value: '4', label: t.profile.myPayments, disabled: false },
  ]

  if (isLoading) {
    return <Loader />
  }

  return (
    <Tabs tabs={profileTabs} value={tabsValue} onValueChange={onChangeTabs} className={s.root}>
      <TabsContent value={'1'} className={s.profileContainer}>
        <ProfileUpdate updateProfileHandler={updateProfileHandler} profile={profile} />
      </TabsContent>
      <TabsContent value={'2'}>
        <div>Devices</div>
      </TabsContent>
      <TabsContent value={'3'}>
        <div>Account Management</div>
      </TabsContent>
      <TabsContent value={'4'}>
        <div>My payments</div>
      </TabsContent>
    </Tabs>
  )
}

ProfileSettings.getLayout = getMainLayout
export default ProfileSettings
