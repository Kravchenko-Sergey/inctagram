import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { useGoogleLoginMutation } from '@/api/auth-api/auth.api'
import { HeadMeta, Login, getHeaderLayout } from '@/components'
import { PATH } from '@/consts/route-paths'
import { tokenSetterToLocalStorage } from '@/helpers/tokenSetterToLocalStorage'

import s from './sign-in.module.scss'

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
