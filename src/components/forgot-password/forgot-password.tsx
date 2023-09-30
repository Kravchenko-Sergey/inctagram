import React, { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import s from './forgot-password.module.scss'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Modal } from '@/components/modal'
import { Recaptcha } from '@/components/recaptcha'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'
import { forgotPasswordSchema, ForgotPasswordSchemaType } from '@/schemas/forgotPasswordSchema'

const ForgotPasswordPageComponent = memo(() => {
  const { t } = useTranslation()
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const recaptchaRef = React.createRef()

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    mode: 'onBlur',
  })

  const onSubmit = (data: ForgotPasswordSchemaType) => {
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
          {t.auth.restorePassword}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            name={'email'}
            label={'Email'}
            placeholder={'Epam@epam.com'}
          ></ControlledTextField>
          <Typography variant={'regular_text_14'} className={s.instructions}>
            {t.auth.passwordRecoveryDescription}
          </Typography>
          {isLinkSent && (
            <Typography className={s.linkSent}>{t.auth.passwordRecoveryLinkSent}</Typography>
          )}
          <Button variant={'primary'} fullWidth={true} className={s.submitBtn} type={'submit'}>
            <Typography variant={'semi-bold_small_text'}> {t.auth.sendLink} </Typography>
          </Button>
          <Button variant="link" href={PATH.LOGIN} className={s.returnBtn}>
            {t.auth.backToLogin}
          </Button>
          <div className={s.recaptchaContainer}>
            <Controller
              name="recaptcha"
              control={control}
              render={({ field }) => <Recaptcha ref={recaptchaRef} {...field} />}
            />
          </div>
        </form>
      </Card>
      <Modal
        isOpen={isModalOpen}
        title={t.auth.emailSent}
        className={s.modalContent}
        onOpenChange={handleCloseModal}
      >
        <Typography variant={'regular_text_16'}>
          {t.auth.sentCodeToEmail('epam@epam.com')}
        </Typography>
        <Button variant={'primary'} onClick={handleCloseModal}>
          <Typography variant={'bold_text_16'}>{t.ok}</Typography>
        </Button>
      </Modal>
    </>
  )
})

export default ForgotPasswordPageComponent
