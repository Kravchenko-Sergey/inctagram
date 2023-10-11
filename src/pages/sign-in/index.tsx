import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'

import { useGoogleLoginMutation } from '@/api/auth-api/auth.api'
import { HeadMeta, getHeaderLayout, Login } from '@/components'
import { PATH } from '@/consts/route-paths'
import { tokenSetterToLocalStorage } from '@/helpers'

import s from './sign-in.module.scss'

const SignIn = () => {
  const router = useRouter()
  const [googleLogin] = useGoogleLoginMutation()
  const onGoogleAuth = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { accessToken } = await googleLogin({ code: tokenResponse.code }).unwrap()

      if (accessToken) {
        tokenSetterToLocalStorage(accessToken)

        router.push(PATH.PROFILE)
      }
    },
    flow: 'auth-code',
  })
  const onGithubAuth = () => {
    if (process.env.NEXT_PUBLIC_GITHUB_AUTH_URL) {
      window.location.assign(process.env.NEXT_PUBLIC_GITHUB_AUTH_URL)

      return
    }

    console.log('Please, provide url in .env for github authorization')
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
