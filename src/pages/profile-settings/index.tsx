import React from 'react'

import s from './profile-settings.module.scss'
import { getMainLayout } from '@/components/layout/main-layout/main-layout'
import { Tabs } from '@/components/tabs'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileUpdate } from '@/components/profile-update/profile-update'
import { Button } from '@/components/button'
import { ImageOutline } from '@/assets/icons/image-outline'
import { useUpdateProfileMutation } from '@/api/profile-api/profile.api'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { ProfileSettingsFormValues } from '@/schemas/profile-settings-schema'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
  const { data: me, isLoading: dataLoading, isError } = useMeQuery()

  const updateProfileHandler = (data: ProfileSettingsFormValues) => {
    updateProfile(data)
  }

  const profileTabs = [
    { value: 'tab1', title: t.profile.generalInfo },
    { value: 'tab2', title: t.profile.devices },
    { value: 'tab3', title: t.profile.accManagement },
    { value: 'tab4', title: t.profile.myPayments },
  ]

  return (
    <div className={s.root}>
      <div>
        <Tabs tabsList={profileTabs} />
      </div>
      <div className={s.formContent}>
        <div className={s.userImageBox}>
          <div className={s.userImage}>
            <ImageOutline />
          </div>
          <Button variant={'ghost'}>{t.profile.addAvatar}</Button>
          <div className={s.line2}></div>
        </div>
        <div className={s.form}>
          <ProfileUpdate updateProfileHandler={updateProfileHandler} />
        </div>
      </div>
    </div>
  )
}

ProfileSettings.getLayout = getMainLayout
export default ProfileSettings
