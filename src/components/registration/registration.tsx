import React, { memo, useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './registration.module.scss'

import { useRegistrationMutation } from '@/api/auth-api/auth.api'
import { GitHubIcon } from '@/assets/icons/github-icon'
import { GoogleIcon } from '@/assets/icons/google-icon'
import { Button } from '@/components/button'
import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Modal } from '@/components/modal'
import { Trans } from '@/components/trans/trans'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'
import { FormFields, triggerZodFieldError } from '@/helpers/updateZodErrors'
import { useTranslation } from '@/hooks/use-translation'
import { createRegisterSchema, RegisterFormType } from '@/schemas/registrationSchema'
import { ErrorType } from '@/types'

export const Registration = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { push } = useRouter()
  const { t } = useTranslation()

  const [register] = useRegistrationMutation()
  const {
    reset,
    formState: { errors, isValid, touchedFields },
    control,
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
          username: data.username,
          email: data.email,
          password: data.password,
        }).unwrap()
        setIsModalOpen(true)
      } catch (e: unknown) {
        const error = e as ErrorType
        // if (error?.data?.message === 'User with this email is already registered') {
        //   setError('email', { type: 'email', message: t.errors.emailExists })
        // } else if (error?.data?.message === 'User with this username is already registered') {
        //   setError('username', { type: 'username', message: t.errors.usernameExists })
        // } else if (error.status === 500) {
        //   // setErrorServer('noResponse')
        //   // dispatch(setAppError(t.errors.noResponse))
        // } else {
        //   // setErrorServer('requestFailed')
        //   // dispatch(setAppError(t.errors.requestFailed))
        // }
      }
    },
    [register]
  )

  return (
    <>
      <div className={s.root}>
        {/*<LanguageSelect />*/}
        {/*<Typography className={s.title} variant="h1">*/}
        {/*  {t.auth.signUp}*/}
        {/*</Typography>*/}
        <Typography className={s.title} variant="h1">
          {t.auth.signUp}
        </Typography>
        <div className={s.icons}>
          <GoogleIcon className={s.icon} />
          <GitHubIcon className={s.icon} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <ControlledTextField label={t.auth.username} control={control} name={'username'} />
          <ControlledTextField
            // placeholder={'Epam@epam.com'}
            label={t.auth.emailLabel}
            control={control}
            name={'email'}
          />
          <ControlledTextField
            type={'password'}
            label={t.auth.passwordLabel}
            control={control}
            name={'password'}
          />
          <ControlledTextField
            type={'password'}
            label={t.auth.passwordConfirmation}
            control={control}
            name={'confirm'}
          />
          <div className={s.checkboxWrap}>
            <ControlledCheckbox
              errorMessage={errors.read?.message}
              control={control}
              name={'read'}
            />

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
            type={'submit'}
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
