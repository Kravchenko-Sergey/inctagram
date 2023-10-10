import React, { memo, useCallback, useEffect } from 'react'

import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { ControlledTextArea } from '@/components/controlled/controlled-text-area'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/hooks/use-translation'
import { ControlledDataPicker } from '@/components/controlled/controlled-data-picker'
import { Button } from '@/components/button'
import { ControlledSelect } from '@/components/controlled/controlled-select'
import s from './profile-update.module.scss'
import { ProfileSettingsFormType, profileSettingsSchema } from '@/schemas'
import { FormFields, triggerZodFieldError } from '@/helpers'

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
  // const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
  // const { data: me, isLoading, isError } = useMeQuery()

  const {
    control,
    formState: { isValid, errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<ProfileSettingsFormType>({
    resolver: zodResolver(profileSettingsSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      userName: '',
      lastName: '',
      city: '',
      dateOfBirth: new Date(),
      aboutMe: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])
  const onSubmit = useCallback(
    async (data: ProfileSettingsFormType) => {
      try {
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
          <ControlledTextField label={t.auth.username} control={control} name={'userName'} />
        </div>
        <div className={s.wrap}>
          <ControlledTextField label={t.profile.firstName} control={control} name={'firstName'} />
        </div>
        <div className={s.wrap}>
          <ControlledTextField label={t.profile.lastName} control={control} name={'lastName'} />
        </div>
        <ControlledDataPicker
          label={t.profile.dateOfBirth}
          className={s.dataPicker}
          control={control}
          name={'dateOfBirth'}
          errorMessage={errors.dateOfBirth?.message}
        />
        <div className={s.wrap}>
          <ControlledSelect
            options={Cities}
            label={t.profile.citySelect}
            control={control}
            placeholder={t.profile.citySelect}
            name={'city'}
            className={s.selectWrapper}
          />
        </div>
        <ControlledTextArea
          className={s.textArea}
          classNameTextArea={s.textAreaEl}
          label={t.profile.aboutMe}
          control={control}
          name={'aboutMe'}
        />
        <div className={s.bottomLine} />
        <Button disabled={!isValid} className={s.submitBtn} variant="primary" type={'submit'}>
          {t.profile.saveChanges}
        </Button>
      </form>
    </div>
  )
})
