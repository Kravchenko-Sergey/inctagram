import React, { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './profile-settings.module.scss'

import { useUpdateProfileMutation } from '@/api/profile-api/profile.api'
import { ImageOutline } from '@/assets/icons/image-outline'
import { Button } from '@/components/button'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Select } from '@/components/select'
import { Tabs } from '@/components/tabs'
import TextArea from '@/components/text-area/text-area'
import { FormFields, triggerZodFieldError } from '@/helpers/updateZodErrors'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileSettingsFormValues, profileSettingsSchema } from '@/schemas/profile-settings-schema'

const Index = () => {
  const { t } = useTranslation()

  const [updateProfile] = useUpdateProfileMutation()

  const profileTabs = [
    { value: 'tab1', title: t.profile.generalInfo },
    { value: 'tab2', title: t.profile.devices },
    { value: 'tab3', title: t.profile.accManagement },
    { value: 'tab4', title: t.profile.myPayments },
  ]

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

  const onSubmit = (data: ProfileSettingsFormValues) => {
    console.log(data)
    updateProfile({
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      dateOfBirth: data.dateOfBirth,
      aboutMe: data.aboutMe,
    })
  }

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
      dateOfBirth: '',
      aboutMe: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  return (
    <div className={s.root}>
      <div>
        <Tabs tabsList={profileTabs} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.fortContent}>
          <div className={s.userImageBox}>
            <div className={s.userImage}>
              <ImageOutline />
            </div>
            <Button variant={'ghost'}>{t.profile.addAvatar}</Button>
          </div>
          <div className={s.userInfo}>
            <ControlledTextField control={control} name="userName" label={t.auth.username} />
            <ControlledTextField control={control} name="firstName" label={t.profile.firstName} />
            <ControlledTextField control={control} name="lastName" label={t.profile.lastName} />
            <Select
              options={cityOptions}
              value={'City'}
              onChange={() => {}}
              label={t.profile.citySelect}
              className={s.select}
            />
            <TextArea label={t.profile.aboutMe} />
          </div>
        </div>
        <Button variant="primary" className={s.submitBtn}>
          {t.profile.saveChanges}
        </Button>
      </form>
    </div>
  )
}

export default Index
