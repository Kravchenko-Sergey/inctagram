import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './profile-settings.module.scss'

import { useUpdateProfileMutation } from '@/api/profile-api/profile.api'
import { ImageOutline } from '@/assets/icons/image-outline'
import { Button } from '@/components/button'
import { ControlledTextArea } from '@/components/controlled/controlled-text-area'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { getMainLayout } from '@/components/layout/main-layout/main-layout'
import { Select } from '@/components/select'
import { Tabs } from '@/components/tabs'
import { FormFields, triggerZodFieldError } from '@/helpers/updateZodErrors'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileSettingsFormValues, profileSettingsSchema } from '@/schemas/profile-settings-schema'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile] = useUpdateProfileMutation()

  const profileTabs = [
    { value: 'tab1', title: t.profile.generalInfo },
    { value: 'tab2', title: t.profile.devices },
    { value: 'tab3', title: t.profile.accManagement },
    { value: 'tab4', title: t.profile.myPayments },
  ]

  const [city, setCity] = useState('City')
  const cityOptions = [
    {
      value: 'Apple',
      label: 'Apple',
    },
    {
      value: 'Banana',
      label: 'Banana',
    },
  ]

  const {
    handleSubmit,
    control,
    formState: { touchedFields },
    trigger,
  } = useForm<ProfileSettingsFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(profileSettingsSchema(t)),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      city: '',
      /*dateOfBirth: '',*/
      aboutMe: '',
    },
  })

  const onSubmit = (data: ProfileSettingsFormValues) => {
    console.log(data)
    updateProfile({
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      /*dateOfBirth: data.dateOfBirth,*/
      aboutMe: data.aboutMe || '',
    })
  }

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

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
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <ControlledTextField control={control} name="userName" label={t.auth.username} />
          <ControlledTextField control={control} name="firstName" label={t.profile.firstName} />
          <ControlledTextField control={control} name="lastName" label={t.profile.lastName} />
          <Select
            name="city"
            options={cityOptions}
            value={city}
            onChange={setCity}
            label={t.profile.citySelect}
            className={s.select}
          />
          <ControlledTextArea
            name="aboutMe"
            control={control}
            label={t.profile.aboutMe}
            className={s.textArea}
          />
          <div className={s.line}></div>
          <Button variant="primary" className={s.submitBtn}>
            {t.profile.saveChanges}
          </Button>
        </form>
      </div>
    </div>
  )
}

ProfileSettings.getLayout = getMainLayout
export default ProfileSettings
