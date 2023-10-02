import React from 'react'

import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import s from './sign-in.module.scss'

import { useGoogleLoginMutation } from '@/api/auth-api/auth.api'
import { HeadMeta } from '@/components/head-meta'
import { getHeaderLayout } from '@/components/layout/header-layout/header-layout'
import { Login } from '@/components/login'
import { PATH } from '@/consts/route-paths'
import { tokenSetterToLocalStorage } from '@/helpers/tokenSetterToLocalStorage'

const SignIn = () => {
  const router = useRouter()
  const [googleLogin, { data: googleToken }] = useGoogleLoginMutation()

  const onGoogleAuth = useGoogleLogin({
    onSuccess: tokenResponse => {
      googleLogin({ code: tokenResponse.code })
      router.push(PATH.PROFILE)
    },
    flow: 'auth-code',
  })

  const onGithubAuth = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  if (googleToken && googleToken.accessToken) {
    tokenSetterToLocalStorage(googleToken.accessToken)
  }

  return (
    <div className={s.root}>
      <HeadMeta title="Sign-in" />
      <main>
        <Login onGoogleAuth={onGoogleAuth} onGithubAuth={onGithubAuth} />
      </main>
    </div>
  )
}

SignIn.getLayout = getHeaderLayout
export default SignIn
