import React, { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/services/auth/auth-api'
import { commonRoutes, PATH } from '@/consts/route-paths'
import { Loader } from '@/components'

type PropsType = {
  children: ReactNode
}

export const AuthProvider = ({ children }: PropsType) => {
  const router = useRouter()
  const { data: user, isLoading } = useMeQuery()

  const remainingPath = router.pathname.replace(/^\/profile(\/[^/]+)?|\/profile\?(.+)/, '/profile')

  const isProtectedPage = !commonRoutes.includes(remainingPath)

  useEffect(() => {
    if ((!isLoading && !user && isProtectedPage) || router.pathname === '/github') {
      router.push(PATH.MAIN)

      return
    }
  }, [user, isProtectedPage, router, isLoading])

  if (isLoading) {
    return <Loader />
  }

  return <>{children}</>
}
