import React, { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

import s from './forgot-password.module.scss'

import { useRecoverPasswordMutation } from '@/api/auth-api/auth.api'
import { RecoverPasswordType } from '@/api/auth-api/types'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Modal } from '@/components/modal'
import { Recaptcha } from '@/components/recaptcha'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'
import { forgotPasswordSchema, forgotPasswordSchemaType } from '@/schemas/forgotPasswordSchema'

const ForgotPasswordPageComponent = memo(() => {
  const { t } = useTranslation()
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recover] = useRecoverPasswordMutation()
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    mode: 'onBlur',
  })

  const setRecaptcha = value => {
    setRecaptchaValue(value)
    console.log('setted', value)
  }

  const onSubmit = (data: forgotPasswordSchemaType) => {
    console.log(data)
    // setIsModalOpen(true)
    // setIsLinkSent(true)
  }

  // const onSubmit = useCallback(
  //   async (data: RecoverPasswordType) => {
  //     try {
  //       await recover({
  //         email: data.email,
  //         recaptcha: data.recaptcha,
  //       }).unwrap()
  //       setIsModalOpen(true)
  //       setIsLinkSent(true)
  //     } catch (e: unknown) {
  //       const error = e as RegisterError
  //
  //       console.log(error)
  //     }
  //   },
  //   [recover]
  // )

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
          <Button
            variant={'primary'}
            fullWidth={true}
            className={s.submitBtn}
            type={'submit'}
            disabled={!recaptchaValue}
          >
            <Typography variant={'semi-bold_small_text'}> {t.auth.sendLink} </Typography>
          </Button>
          <Button variant="link" href={PATH.LOGIN} className={s.returnBtn}>
            {t.auth.backToLogin}
          </Button>
          <div className={s.recaptchaContainer}>
            {/*<input type="hidden" control={control} name={'recaptcha'} value={recaptchaValue} />*/}
            {/*<TextField*/}
            {/*  type={'hidden'}*/}
            {/*  control={control}*/}
            {/*  name={'recaptcha'}*/}
            {/*  value={recaptchaValue}*/}
            {/*/>*/}
            {/*<Controller*/}
            {/*  name="recaptcha"*/}
            {/*  control={control}*/}
            {/*  render={({ field }) => <Recaptcha {...field} setRecaptcha={setRecaptcha} />}*/}
            {/*/>*/}
            <Recaptcha setRecaptcha={setRecaptcha} />
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
