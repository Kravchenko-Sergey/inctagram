import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Typography } from '@/components/typography'

const forgotPasswordSchema = z.object({
  email: z.string().nonempty('Введите email').email().default(''),
})

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPageComponent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: forgotPasswordSchemaType) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'h1'} className={s.title}>
        Forgot password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          name={'forgot-password'}
          label={'Email'}
          placeholder={'Epam@epam.com'}
        ></ControlledTextField>
      </form>
      <Typography variant={'regular_text_14'} className={s.instructions}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button variant={'primary'} fullWidth={true} className={s.submitBtn}>
        Send Link
      </Button>
      <Button variant={'link'} href={''} className={s.returnBtn}>
        Back to Sign In
      </Button>
    </Card>
  )
}

export default ForgotPasswordPageComponent
