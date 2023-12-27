import React, { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useLazyMeQuery, useLoginMutation } from '@/services/auth/auth-api'
import {
  Button,
  Card,
  ControlledTextField,
  Loader,
  SocialMediaAuth,
  Typography,
} from '@/components'
import { PATH } from '@/consts/route-paths'
import { FormFields, tokenSetterToLocalStorage, triggerZodFieldError } from '@/helpers'
import { useTranslation } from '@/hooks'
import { LoginFormValues, loginSchema } from '@/schemas'

import s from './login.module.scss'

export const Login = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [getUser, { isLoading, isFetching, data }] = useLazyMeQuery()
  // const { data: me } = useMeQuery()
  const [signIn, { isLoading: isSignInLoading, isSuccess }] = useLoginMutation()

  const {
    handleSubmit,
    control,
    formState: { touchedFields },
    trigger,
    setError,
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema(t)),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { accessToken } = await signIn(data).unwrap()

      if (accessToken) {
        tokenSetterToLocalStorage(accessToken)

        const res = await getUser().unwrap() // TODO check if it is necessary

        // push(PATH.PROFILE)
        // push(`${PATH.PROFILE}/${+me?.userId!}`)
        push(`${PATH.PROFILE}/?id=${res?.userId!}`)
      }
    } catch (e: any) {
      // TODO разобраться с ошибкой при 500 сервере
      if (
        e.data &&
        (e.data.messages[0].message === 'Authorization error' ||
          e.data.messages === 'invalid password or email')
      ) {
        setError('password', { type: 'password', message: t.errors.loginIncorrectData })
      }
    }
  }

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  if (isLoading || isSignInLoading || isSuccess) {
    return <Loader />
  }

  return (
    <Card className={s.card}>
      <Typography variant="h1" as="h1" className={s.title}>
        {t.auth.signIn}
      </Typography>
      <SocialMediaAuth />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.fields}>
          <ControlledTextField
            name="email"
            control={control}
            label={t.auth.emailLabel}
            type="email"
          />
          <ControlledTextField
            name="password"
            control={control}
            label={t.auth.passwordLabel}
            type="password"
          />
        </div>
        <div className={s.btnWrap}>
          <Typography href={PATH.FORGOT_PASSWORD} as="a" className={s.forgotPassLink}>
            {t.auth.forgotPassword}
          </Typography>
        </div>
        <Button variant="primary" fullWidth type="submit" className={s.submitBtn}>
          <Typography variant="h3">{t.auth.signIn}</Typography>
        </Button>
      </form>
      <Typography variant="regular_text_16" as="div" className={s.caption}>
        {t.auth.haveAccount}
      </Typography>
      <Typography href={PATH.REGISTRATION} variant="h3" as="a" className={s.signUpLink}>
        {t.auth.signUp}
      </Typography>
    </Card>
  )
}
