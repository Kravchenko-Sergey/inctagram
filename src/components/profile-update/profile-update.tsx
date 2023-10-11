import { memo, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ControlledTextField,
  ControlledTextArea,
  Button,
  ControlledDataPicker,
  ControlledSelect,
} from '@/components'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileSettingsFormType, profileSettingsSchema } from '@/schemas'
import { FormFields, triggerZodFieldError } from '@/helpers'

import s from './profile-update.module.scss'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { useGetProfileQuery } from '@/api/profile-api/profile.api'
import { parseISO } from 'date-fns'

const Cities = [
  { label: 'Grodno', value: 'Grodno' },
  { label: 'Chita', value: 'Chita' },
  { label: 'Baghdad', value: 'Baghdad' },
]

type ProfileUpdateProps = {
  updateProfileHandler: (data: ProfileSettingsFormType) => void
}

export const ProfileUpdate = memo(({ updateProfileHandler }: ProfileUpdateProps) => {
  const { t } = useTranslation()

  const { data: me } = useMeQuery()
  const { data: profile } = useGetProfileQuery({ profileId: me?.userId })

  const [profileData, setProfileData] = useState<ProfileSettingsFormType>(() => {
    const storedProfileData = localStorage.getItem('profileData')

    return storedProfileData ? JSON.parse(storedProfileData) : {}
  })

  const {
    control,
    formState: { isValid, errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<ProfileSettingsFormType>({
    resolver: zodResolver(profileSettingsSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      firstName: profileData.firstName || profile?.firstName,
      userName: profileData.userName || profile?.userName,
      lastName: profileData.lastName || profile?.lastName,
      city: profileData.city || profile?.city,
      dateOfBirth:
        parseISO(String(profileData.dateOfBirth)) || parseISO(String(profile?.dateOfBirth)),
      aboutMe: profileData.aboutMe || profile?.aboutMe,
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  const onSubmit = useCallback(
    async (data: ProfileSettingsFormType) => {
      try {
        localStorage.setItem('profileData', JSON.stringify(data))
        updateProfileHandler(data)
      } catch (e: unknown) {
        console.log('error', e)
      }
    },
    [updateProfileHandler]
  )

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.wrap}>
          <ControlledTextField label={t.auth.username} control={control} name="userName" />
        </div>
        <div className={s.wrap}>
          <ControlledTextField label={t.profile.firstName} control={control} name="firstName" />
        </div>
        <div className={s.wrap}>
          <ControlledTextField label={t.profile.lastName} control={control} name="lastName" />
        </div>
        <ControlledDataPicker
          label={t.profile.dateOfBirth}
          className={s.dataPicker}
          control={control}
          name="dateOfBirth"
          errorMessage={errors.dateOfBirth?.message}
        />
        <div className={s.wrap}>
          <ControlledSelect
            options={Cities}
            label={t.profile.citySelect}
            control={control}
            placeholder={t.profile.citySelect}
            name="city"
            className={s.selectWrapper}
          />
        </div>
        <ControlledTextArea
          className={s.textArea}
          classNameTextArea={s.textAreaEl}
          label={t.profile.aboutMe}
          control={control}
          name="aboutMe"
        />
        <div className={s.bottomLine} />
        <Button disabled={!isValid} className={s.submitBtn} variant="primary" type="submit">
          {t.profile.saveChanges}
        </Button>
      </form>
    </div>
  )
})
