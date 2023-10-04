import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { PATH } from '@/consts/route-paths'
import { tokenSetterToLocalStorage } from '@/helpers'

const Github = () => {
  const router = useRouter()

  console.log('value', router.query.accessToken)

  useEffect(() => {
    if (router.query.accessToken) {
      tokenSetterToLocalStorage(router.query.accessToken as string)
      router.push(PATH.PROFILE)
    }
  }, [router])

  return <></>
}

export default Github
