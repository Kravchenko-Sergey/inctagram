import React from 'react'
import { getSettingsTabLayout } from '@/components/layout/settings-tabs-layout/settings-tab-layout'
import { ProfileUpdate } from '@/components'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/services/profile'
import { ProfileSettingsFormType } from '@/schemas'
import { toast } from 'react-toastify'

const General = () => {
  const { data: profile, isLoading } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()

  const updateProfileHandler = async (data: ProfileSettingsFormType) => {
    try {
      await updateProfile(data).unwrap()
    } catch (error) {
      // @ts-ignore
      toast.error(`${error?.data.messages[0].message}`, { icon: false })
    }
  }

  return <ProfileUpdate updateProfileHandler={updateProfileHandler} profile={profile} />
}

General.getLayout = getSettingsTabLayout
export default General
