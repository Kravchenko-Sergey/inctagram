import React, { memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './password-recovery.module.scss'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Typography } from '@/components/typography'
import { passwordRegex } from '@/consts/regex'

const passwordRecoverySchema = z.object({
  new_password: z
    .string()
    .nonempty('Enter password')
    .regex(
      passwordRegex,
      'Password must contain 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
        ' _` { | } ~'
    )
    .trim()
    .min(6, 'Password must be at least 6 characters'),
  password_confirmation: z
    .string()
    .nonempty('Enter password')
    .regex(
      passwordRegex,
      'Password must contain 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
        ' _` { | } ~'
    )
    .trim()
    .min(6, 'Password must be at least 6 characters'),
})

export type passwordRecoverySchemaType = z.infer<typeof passwordRecoverySchema>

const PasswordRecoveryPageComponent = memo(() => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<passwordRecoverySchemaType>({
    resolver: zodResolver(passwordRecoverySchema),
  })

  const onSubmit = (data: passwordRecoverySchemaType) => {
    console.log(data)
  }

  return (
    <>
      <Card className={s.passwordRecovery}>
        <Typography variant={'h1'} className={s.title}>
          Create New Password
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
            Your password must be between 6 and 20 characters
          </Typography>
          <Button variant={'primary'} fullWidth={true} className={s.submitBtn} type={'submit'}>
            <Typography variant={'semi-bold_small_text'}>Create new password</Typography>
          </Button>
        </form>
      </Card>
    </>
  )
})

export default PasswordRecoveryPageComponent
