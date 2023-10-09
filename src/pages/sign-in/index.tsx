import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

<<<<<<< Updated upstream
import { useGoogleLoginMutation } from '@/api/auth-api/auth.api'
import { HeadMeta, Login, getHeaderLayout } from '@/components'
=======
import { useGoogleLoginMutation, useLazyMeQuery } from '@/api/auth-api/auth.api'
import { HeadMeta } from '@/components/head-meta'
import { getHeaderLayout } from '@/components/layout/header-layout/header-layout'
import { Login } from '@/components/login'
>>>>>>> Stashed changes
import { PATH } from '@/consts/route-paths'
import { tokenSetterToLocalStorage } from '@/helpers'

import s from './sign-in.module.scss'

import s from './sign-in.module.scss'

const SignIn = () => {
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()
  const [getUser] = useLazyMeQuery()

  const onGoogleAuth = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { accessToken } = await googleLogin({ code: tokenResponse.code }).unwrap()

      if (accessToken) {
        tokenSetterToLocalStorage(accessToken)
        await getUser()
        router.push(PATH.PROFILE)
      }
    },
    flow: 'auth-code',
  })

  const onGithubAuth = () => router.push('https://inctagram.work/api/v1/auth/github/login')

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
