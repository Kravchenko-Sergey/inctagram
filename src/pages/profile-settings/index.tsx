import { useGetProfileQuery, useUpdateProfileMutation } from '@/api/profile-api/profile.api'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { getMainLayout, Tabs, ProfileUpdate, ProfileImage } from '@/components'
import { useTranslation } from '@/hooks'
import { ProfileSettingsFormType } from '@/schemas'
import { PROFILE_DEFAULT_VALUES } from '@/consts/default-form-values'

import s from './profile-settings.module.scss'
import { Loader } from '@/components/loader'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile] = useUpdateProfileMutation()
  const { data: me } = useMeQuery()
  const { data: profile, isLoading } = useGetProfileQuery({ profileId: me?.userId })

  const updateProfileHandler = (data: ProfileSettingsFormType) => {
    updateProfile(data)
  }
  const profileTabs = [
    { value: 'tab1', title: t.profile.generalInfo },
    { value: 'tab2', title: t.profile.devices },
    { value: 'tab3', title: t.profile.accManagement },
    { value: 'tab4', title: t.profile.myPayments },
  ]

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={s.root}>
      <div>
        <Tabs tabsList={profileTabs} />
      </div>
      <div className={s.formContent}>
        <ProfileImage />
        <div className={s.form}>
          <ProfileUpdate updateProfileHandler={updateProfileHandler} profile={profile} />
        </div>
      </div>
    </div>
  )
}

ProfileSettings.getLayout = getMainLayout
export default ProfileSettings
