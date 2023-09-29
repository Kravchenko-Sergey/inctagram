import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { PATH } from '@/consts/route-paths'

const Github = () => {
  const router = useRouter()

  console.log('value', router.query.accessToken)

  useEffect(() => {
    router.push(PATH.PROFILE)
  }, [router])

  return <></>
}

export default Github
