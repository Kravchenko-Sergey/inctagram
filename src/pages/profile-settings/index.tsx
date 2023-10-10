import React from 'react'

import s from './profile-settings.module.scss'
import { getMainLayout, Tabs, ProfileUpdate, Button } from '@/components'
import { useTranslation } from '@/hooks'
import { ImageOutline } from '@/assets/icons'
import { useUpdateProfileMutation } from '@/api/profile-api/profile.api'
import { ProfileSettingsFormType } from '@/schemas'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile] = useUpdateProfileMutation()

  const updateProfileHandler = (data: ProfileSettingsFormType) => {
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
          <Button variant="ghost">{t.profile.addAvatar}</Button>
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
