import React, { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Modal } from '@/components/modal'
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
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: forgotPasswordSchemaType) => {
    console.log(data)
    setIsModalOpen(true)
    setIsLinkSent(true)
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
          {isLinkSent && (
            <Typography className={s.linkSent}>
              The link has been sent by email. If you don’t receive an email send link again
            </Typography>
          )}
          <Button variant={'primary'} fullWidth={true} className={s.submitBtn} type={'submit'}>
            <Typography variant={'semi-bold_small_text'}>Send Link</Typography>
          </Button>
          <Button variant="link" href={PATH.LOGIN} as="a" className={s.returnBtn}>
            <Typography variant={'semi-bold_small_text'}>Back to Sign In</Typography>
          </Button>
        </form>
      </Card>
      <Modal
        isOpen={isModalOpen}
        title={'Email sent'}
        className={s.modalContent}
        onOpenChange={handleCloseModal}
      >
        <Typography variant={'regular_text_16'}>
          We have sent a link to confirm your email to epam@epam.com
        </Typography>
        <Button
          variant={'primary'}
          onClick={() => {
            setIsModalOpen(false)
          }}
        >
          <Typography variant={'bold_text_16'}>OK</Typography>
        </Button>
      </Modal>
    </>
  )
})

export default ForgotPasswordPageComponent
