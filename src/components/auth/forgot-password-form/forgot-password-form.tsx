import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { useRecoverPasswordMutation } from '@/services/auth/auth-api'
import { Button, Card, ControlledTextField, Modal, Recaptcha, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks'
import { ForgotPasswordSchemaType, forgotPasswordSchema } from '@/schemas'

import { RegisterError } from '@/types'

import s from './forgot-password-form.module.scss'

export const ForgotPasswordForm = () => {
  const { t } = useTranslation()
  const [sentEmailValue, setSentEmailValue] = useState('')
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recover] = useRecoverPasswordMutation()

  const {
    reset,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    mode: 'onBlur',
  })

  const onSubmit = useCallback(
    async (data: ForgotPasswordSchemaType) => {
      try {
        await recover({
          email: data.email,
          recaptcha: data.recaptcha,
        }).unwrap()
        setSentEmailValue(data.email)
        setIsModalOpen(true)
        setIsLinkSent(true)
      } catch (e: unknown) {
        const error = e as RegisterError

        console.log(error)
      }
    },
    [recover]
  )

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    reset()
  }, [reset])

  return (
    <>
      <Card className={s.forgotPassword}>
        <Typography variant="h1" className={s.title}>
          {t.auth.restorePassword}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            placeholder="example@epam.com"
          />
          <Typography variant="regular_text_14" className={s.instructions}>
            {t.auth.passwordRecoveryDescription}
          </Typography>
          {isLinkSent && (
            <Typography className={s.linkSent}>{t.auth.passwordRecoveryLinkSent}</Typography>
          )}
          <Button
            disabled={!isValid}
            variant="primary"
            fullWidth={true}
            className={s.submitBtn}
            type="submit"
          >
            <Typography variant="semi-bold_small_text"> {t.auth.sendLink} </Typography>
          </Button>
          <Button as="a" variant="link" href={PATH.LOGIN} className={s.returnBtn}>
            {t.auth.backToLogin}
          </Button>
          <div className={s.recaptchaContainer}>
            <Controller
              name="recaptcha"
              control={control}
              render={({ field }) => <Recaptcha {...field} />}
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
        <Typography variant="regular_text_16">{t.auth.sentCodeToEmail(sentEmailValue)}</Typography>
        <Button variant="primary" onClick={handleCloseModal} className={s.closeButton}>
          <Typography variant="h3">{t.ok}</Typography>
        </Button>
      </Modal>
    </>
  )
}
