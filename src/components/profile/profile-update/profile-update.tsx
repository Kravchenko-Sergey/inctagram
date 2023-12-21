import { memo, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'

import {
  ControlledTextField,
  ControlledTextArea,
  Button,
  ControlledDataPicker,
  ControlledSelect,
  ProfileImage,
} from '@/components'

import { MAX_CHARS_ABOUT_ME } from '@/consts/input-limits'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileSettingsFormType, profileSettingsSchema } from '@/schemas'
import { FormFields, triggerZodFieldError } from '@/helpers'
import { AvatarType, useUpdateProfileMutation } from '@/services/profile'

import s from './profile-update.module.scss'

type ProfileAvatar = { avatars: AvatarType[] }

type ProfileUpdateProps = {
  updateProfileHandler: (data: ProfileSettingsFormType) => void
  // profile?: ProfileSettingsFormType & ProfileAvatar
  // profile?: GetProfileDataResponse & { fullName: string | null }
  profile?: any & { fullName: string | null } // Todo разобраться с эни которое после обновления сломалось
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
      firstName: profile?.profile.firstName ?? '',
      userName: profile?.profile.userName ?? '',
      lastName: profile?.profile.lastName ?? '',
      city: profile?.profile.city ?? '',
      dateOfBirth: profile?.profile.dateOfBirth
        ? parseISO(`${profile.profile.dateOfBirth}`)
        : new Date(),
      aboutMe: profile?.profile.aboutMe ?? '',
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
          <ProfileImage avatars={profile?.profile.avatars[0]?.url} />
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
              counter={MAX_CHARS_ABOUT_ME}
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
