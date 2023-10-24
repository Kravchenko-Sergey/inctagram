import { memo, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  ControlledTextField,
  ControlledTextArea,
  Button,
  ControlledDataPicker,
  ControlledSelect,
  ProfileImage,
} from '@/components'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileSettingsFormType, profileSettingsSchema } from '@/schemas'
import { FormFields, triggerZodFieldError } from '@/helpers'

import s from './profile-update.module.scss'
import { parseISO } from 'date-fns'
import { Avatar } from '@/services/profile'

type ProfileAvatar = { avatars: Avatar[] }

type ProfileUpdateProps = {
  updateProfileHandler: (data: ProfileSettingsFormType) => void
  profile?: ProfileSettingsFormType & ProfileAvatar
}

const Cities = [
  { label: 'Grodno', value: 'Grodno' },
  { label: 'Chita', value: 'Chita' },
  { label: 'Baghdad', value: 'Baghdad' },
]

export const ProfileUpdate = memo(({ updateProfileHandler, profile }: ProfileUpdateProps) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { isValid, errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<ProfileSettingsFormType>({
    resolver: zodResolver(profileSettingsSchema(t)),
    mode: 'onChange',
    defaultValues: {
      firstName: profile?.firstName ?? '',
      userName: profile?.userName ?? '',
      lastName: profile?.lastName ?? '',
      city: profile?.city ?? '',
      dateOfBirth: profile?.dateOfBirth ? parseISO(`${profile.dateOfBirth}`) : new Date(),
      aboutMe: profile?.aboutMe ?? '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  const onSubmit = useCallback(
    (data: ProfileSettingsFormType) => updateProfileHandler(data),
    [updateProfileHandler]
  )

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.innerContainer}>
          <ProfileImage avatars={profile?.avatars[0]?.url} />
          <div className={s.formWrap}>
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
          </div>
        </div>
        <Button disabled={!isValid} className={s.submitBtn} variant="primary" type="submit">
          {t.profile.saveChanges}
        </Button>
      </form>
    </div>
  )
})
