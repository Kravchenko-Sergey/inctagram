import { useRouter } from 'next/router'
import { useGoogleLogin } from '@react-oauth/google'

import { useGoogleLoginMutation, useLazyMeQuery, useMeQuery } from '@/services/auth/auth-api'
import { GitHubIcon, GoogleIcon } from '@/assets/icons'
import { tokenSetterToLocalStorage } from '@/helpers'
import { PATH } from '@/consts/route-paths'

import s from './social-media-auth.module.scss'

export const SocialMediaAuth = () => {
  const { push } = useRouter()

  const [googleLogin] = useGoogleLoginMutation()
  const [getUser] = useLazyMeQuery()
  // const { data: me } = useMeQuery()

  const googleLoginAndRegister = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { accessToken } = await googleLogin({ code: tokenResponse.code }).unwrap()

      if (accessToken) {
        tokenSetterToLocalStorage(accessToken)
        const res = await getUser().unwrap()

        // push(PATH.PROFILE)
        // push(`${PATH.PROFILE}/${+me?.userId!}`)

        push(`${PATH.PROFILE}/${res?.userId!}`)
      }
    },
    flow: 'auth-code',
  })

  const githubLoginAndRegister = () => {
    if (process.env.NEXT_PUBLIC_GITHUB_AUTH_URL) {
      window.location.assign(process.env.NEXT_PUBLIC_GITHUB_AUTH_URL)

      return
    }

    console.log('Please, provide url in .env for github authorization')
  }

  return (
    <div className={s.icons}>
      <GoogleIcon onClick={googleLoginAndRegister} className={s.icon} width={36} height={36} />
      <GitHubIcon onClick={githubLoginAndRegister} className={s.icon} width={36} height={36} />
    </div>
  )
}
