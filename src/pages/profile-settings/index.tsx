import { useGetProfileQuery, useUpdateProfileMutation } from '@/services/profile/profile-api'
import { getMainLayout, ProfileUpdate, Tabs } from '@/components'
import { useTranslation } from '@/hooks'
import { ProfileSettingsFormType } from '@/schemas'
import { toast } from 'react-toastify'

import s from './profile-settings.module.scss'
import { Loader } from '@/components/ui/loader'

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
        <div className={s.form}>
          <ProfileUpdate updateProfileHandler={updateProfileHandler} profile={profile} />
        </div>
      </div>
    </div>
  )
}

ProfileSettings.getLayout = getMainLayout
export default ProfileSettings
