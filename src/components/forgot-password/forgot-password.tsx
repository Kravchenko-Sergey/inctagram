import React, { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('Введите email')
    .email('The email must match the format example@example.com')
    .default(''),
})

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPageComponent = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: forgotPasswordSchemaType) => {
    console.log(data)
    setIsModalOpen(true)
  }

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    reset()
  }, [reset])

  return (
    <>
      <Card className={s.forgotPassword}>
        <Typography variant={'h1'} className={s.title}>
          Forgot password
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            name={'email'}
            label={'Email'}
            placeholder={'Epam@epam.com'}
          ></ControlledTextField>
          <Typography variant={'regular_text_14'} className={s.instructions}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button variant={'primary'} fullWidth={true} className={s.submitBtn} type={'submit'}>
            Send Link
          </Button>
          <Button variant="link" href={PATH.LOGIN} as="a" className={s.returnBtn}>
            Back to Sign In
          </Button>
        </form>
      </Card>
    </>
  )
})

export default ForgotPasswordPageComponent
