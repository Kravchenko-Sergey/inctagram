import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { PATH } from '@/consts/route-paths'
<<<<<<< Updated upstream
import { tokenSetterToLocalStorage } from '@/helpers'

const Github = () => {
  const router = useRouter()

  console.log('value', router)
  console.log('value')
=======
import { tokenSetterToLocalStorage } from '@/helpers/tokenSetterToLocalStorage'
import { useLazyMeQuery } from '@/api/auth-api/auth.api'

const Github = () => {
  const router = useRouter()
  const [getUser] = useLazyMeQuery()

>>>>>>> Stashed changes
  useEffect(() => {
    const refetchUser = async () => await getUser().unwrap()

    if (router.query.accessToken) {
      tokenSetterToLocalStorage(router.query.accessToken as string)
      refetchUser()
      router.push(PATH.PROFILE)
    }
  }, [router, getUser])

  return null
}

export default Github
