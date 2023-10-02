import React, { memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './password-recovery.module.scss'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Typography } from '@/components/typography'
import { useTranslation } from '@/hooks/use-translation'
import {
  passwordRecoverySchema,
  passwordRecoverySchemaType,
} from '@/schemas/passwordRecoverySchema'

const PasswordRecoveryPageComponent = memo(() => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<passwordRecoverySchemaType>({
    resolver: zodResolver(passwordRecoverySchema(t)),
  })

  const onSubmit = (data: passwordRecoverySchemaType) => {
    console.log(data)
  }

  return (
    <>
      <Card className={s.passwordRecovery}>
        <Typography variant={'h1'} className={s.title}>
          {t.auth.newPasswordTitle}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            type={'password'}
            name={'new_password'}
            label={'New password'}
          ></ControlledTextField>
          <ControlledTextField
            control={control}
            type={'password'}
            name={'password_confirmation'}
            label={'Password confirmation'}
          ></ControlledTextField>
          <Typography variant={'regular_text_14'} className={s.instructions}>
            {t.auth.newPasswordDescription}
          </Typography>
          <Button variant={'primary'} fullWidth={true} className={s.submitBtn} type={'submit'}>
            <Typography variant={'semi-bold_small_text'}>{t.auth.newPasswordButton}</Typography>
          </Button>
        </form>
      </Card>
    </>
  )
})

export default PasswordRecoveryPageComponent
