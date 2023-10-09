import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

<<<<<<< Updated upstream
import { useLoginMutation } from '@/api/auth-api/auth.api'
import { GitHubIcon, GoogleIcon } from '@/assets/icons'
import { Button, Card, ControlledTextField, Typography } from '@/components'
=======
import { useLazyMeQuery, useLoginMutation } from '@/api/auth-api/auth.api'
import { GitHubIcon } from '@/assets/icons/github-icon'
import { GoogleIcon } from '@/assets/icons/google-icon'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Typography } from '@/components/typography'
>>>>>>> Stashed changes
import { PATH } from '@/consts/route-paths'
import { FormFields, triggerZodFieldError } from '@/helpers'
import { useTranslation } from '@/hooks'
import { LoginFormValues, loginSchema } from '@/schemas'
<<<<<<< Updated upstream
=======
import { tokenSetterToLocalStorage } from '@/helpers/tokenSetterToLocalStorage'
>>>>>>> Stashed changes

import s from './login.module.scss'

type LoginProps = {
  onGoogleAuth?: () => void
  onGithubAuth?: () => void
}

export const Login: FC<LoginProps> = ({ onGoogleAuth, onGithubAuth }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [signIn] = useLoginMutation()
  const [getUser] = useLazyMeQuery()

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
<<<<<<< Updated upstream
      await signIn(data).unwrap()

      router.push(PATH.PROFILE)
    } catch (error) {
      const e = error as any // TODO add type

=======
      const { accessToken } = await signIn(data).unwrap()

      if (accessToken) {
        tokenSetterToLocalStorage(accessToken)
        await getUser()
        router.push(PATH.PROFILE)
      }
    } catch (e: any) {
>>>>>>> Stashed changes
      if (
        e.data.messages[0].message === 'Authorization error' ||
        e.data.messages === 'invalid password or email'
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
      <div className={s.icons}>
        <GoogleIcon onClick={onGoogleAuth} />
        <GitHubIcon onClick={onGithubAuth} />
      </div>
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
        <Typography href={PATH.FORGOT_PASSWORD} as="a" className={s.forgotPassLink}>
          {t.auth.forgotPassword}
        </Typography>
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
