import { memo, useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRegistrationMutation } from '@/services/auth/auth-api'
import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  Modal,
  SocialMediaAuth,
  Trans,
  Typography,
} from '@/components'
import { PATH } from '@/consts/route-paths'
import { FormFields, triggerZodFieldError } from '@/helpers'
import { useTranslation } from '@/hooks'
import { RegisterFormType, createRegisterSchema } from '@/schemas'
import { RegisterError } from '@/types'

import s from './registration.module.scss'

export const Registration = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { push } = useRouter()
  const { t } = useTranslation()
  const [register] = useRegistrationMutation()
  const {
    reset,
    formState: { errors, isValid, touchedFields },
    control,
    setError,
    trigger,
    getValues,
    handleSubmit,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(createRegisterSchema(t)),
    mode: 'onBlur',
    defaultValues: { username: '', email: '', password: '', confirm: '', read: false },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    reset()
  }, [reset])

  const handleChangeModal = useCallback(() => {
    setIsModalOpen(false)
    push(PATH.LOGIN)
  }, [push])

  const onSubmit = useCallback(
    async (data: RegisterFormType) => {
      try {
        await register({
          userName: data.username,
          email: data.email,
          password: data.password,
        }).unwrap()
        setIsModalOpen(true)
      } catch (e: unknown) {
        const error = e as RegisterError

        if (error?.data?.messages[0]?.message === 'User with this email is already exist') {
          setError('email', { type: 'email', message: t.errors.emailExists })
        } else if (
          error?.data?.messages[0]?.message === 'User with this userName is already exist'
        ) {
          setError('username', { type: 'username', message: t.errors.usernameExists })
        } else {
          toast.error('Error! Server is not available', { icon: false })
        }
      }
    },
    [register, setError, t.errors.emailExists, t.errors.usernameExists]
  )

  return (
    <>
      <div className={s.root}>
        <Typography className={s.title} variant="h1">
          {t.auth.signUp}
        </Typography>
        <SocialMediaAuth />
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <ControlledTextField label={t.auth.username} control={control} name="username" />
          <ControlledTextField label={t.auth.emailLabel} control={control} name="email" />
          <ControlledTextField
            type="password"
            label={t.auth.passwordLabel}
            control={control}
            name="password"
          />
          <ControlledTextField
            type="password"
            label={t.auth.passwordConfirmation}
            control={control}
            name="confirm"
          />
          <div className={s.checkboxWrap}>
            <ControlledCheckbox errorMessage={errors.read?.message} control={control} name="read" />

            <Typography variant="small_text">
              <Trans
                text={t.auth.termsPolicyLinks}
                tags={{
                  '1': () => (
                    <Typography variant="small_link" href={PATH.SERVICE} color="inherit" as="a">
                      {t.auth.termsOfService}
                    </Typography>
                  ),
                  '2': () => (
                    <Typography variant="small_link" href={PATH.POLICY} color="inherit" as="a">
                      {t.auth.privacyPolicy}
                    </Typography>
                  ),
                }}
              />
            </Typography>
          </div>
          <Button
            disabled={!isValid}
            className={s.btnSingUp}
            fullWidth
            variant="primary"
            type="submit"
          >
            <Typography color="inherit" variant="h3">
              {t.auth.signUp}
            </Typography>
          </Button>
        </form>
        <Typography className={s.footerTitle} variant="regular_text_16">
          {t.auth.haveAccount}
        </Typography>
        <Button className={s.btnSignIn} variant="link" href={PATH.LOGIN} as="a" fullWidth>
          <Typography className={s.link} color="inherit" variant="h3">
            {t.auth.signIn}
          </Typography>
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={t.auth.emailSent}
        className={s.modal}
        onOpenChange={handleCloseModal}
      >
        {t.auth.sentCodeToEmail(getValues('email'))}
        <Button variant="primary" onClick={handleChangeModal} className={s.modalButton}>
          <Typography color="inherit" variant="h3">
            OK
          </Typography>
        </Button>
      </Modal>
    </>
  )
})
