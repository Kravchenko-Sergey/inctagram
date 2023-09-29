import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './profile-settings.module.scss'

import { ImageOutline } from '@/assets/icons/image-outline'
import { Button } from '@/components/button'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Select } from '@/components/select'
import { Tabs } from '@/components/tabs'
import TextArea from '@/components/text-area/text-area'
import { useTranslation } from '@/hooks/use-translation'
import { loginSchema } from '@/schemas/loginSchema'
import { ProfileSettingsFormValues } from '@/schemas/profile-settings-schema'

const Index = () => {
  const { t } = useTranslation()

  const profileTabs = [
    { value: 'tab1', title: 'General information' },
    { value: 'tab2', title: 'Devices' },
    { value: 'tab3', title: 'Account Management' },
    { value: 'tab4', title: 'My payments' },
  ]

  const sityOptions = [
    {
      value: 'Apple',
      label: 'Apple',
    },
    {
      value: 'Banana',
      label: 'Banana',
    },
  ]

  const onSubmit = () => {}

  const { handleSubmit, control } = useForm<ProfileSettingsFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema(t)),
    defaultValues: { userName: '', firstName: '', lastName: '' },
  })

  return (
    <div className={s.root}>
      <div>
        <Tabs tabsList={profileTabs} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.suserX}>
          <div className={s.userImageBox}>
            <div className={s.userImage}>
              <ImageOutline />
            </div>
            <Button variant={'ghost'}>Add a Profile Photo</Button>
          </div>
          <div className={s.userInfo}>
            <ControlledTextField control={control} name="userName" label="Username" />
            <ControlledTextField control={control} name="firstName" label="First Name" />
            <ControlledTextField control={control} name="lastName" label="Last Name" />
            <Select
              options={sityOptions}
              value={'City'}
              onChange={() => {}}
              label="Select your city"
              className={s.select}
            />
            <TextArea label="About Me" placeholder="Text-area" />
          </div>
        </div>
        <Button variant="primary" className={s.submitBtn}>
          Save Changes
        </Button>
      </form>
    </div>
  )
}

export default Index
