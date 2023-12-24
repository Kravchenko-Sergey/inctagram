import { useEffect } from 'react'

import { PATH } from '@/consts/route-paths'
import { tokenSetterToLocalStorage } from '@/helpers'
import { useLazyMeQuery } from '@/services/auth/auth-api'
import { useTypedRouter } from '@/hooks'
import { routerGithubSchema } from '@/schemas'

const Github = () => {
  const router = useTypedRouter(routerGithubSchema)
  const [getUser] = useLazyMeQuery()

  useEffect(() => {
    const refetchUser = async () => await getUser().unwrap()

    if (router.query.accessToken) {
      tokenSetterToLocalStorage(router.query.accessToken)

      refetchUser().then(res => router.push(`${PATH.PROFILE}/?id=${res?.userId!}`))
    }
  }, [router, getUser])

  return null
}

export default Github
