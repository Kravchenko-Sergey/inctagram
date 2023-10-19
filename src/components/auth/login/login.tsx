import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useLazyMeQuery, useLoginMutation } from '@/services/auth/auth-api'
import { Button, Card, ControlledTextField, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { FormFields, tokenSetterToLocalStorage, triggerZodFieldError } from '@/helpers'
import { useTranslation } from '@/hooks'
import { LoginFormValues, loginSchema } from '@/schemas'

import s from './login.module.scss'
import { SocialMediaAuth } from '../social-media-auth'

export const Login: FC = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [getUser] = useLazyMeQuery()

  const [signIn] = useLoginMutation()

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
        await getUser().unwrap() // TODO check if it is necessary
        push(PATH.PROFILE)
      }
    } catch (e: any) {
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
