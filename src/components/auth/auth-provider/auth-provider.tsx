import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/services/auth/auth-api'
import { commonRoutes, PATH } from '@/consts/route-paths'
import { Loader } from '@/components/ui/loader'

type PropsType = {
  children: ReactNode
}

export const AuthProvider = ({ children }: PropsType) => {
  const router = useRouter()
  const { data: user, isLoading, isError, isFetching } = useMeQuery()

  // const isProtectedPage = !commonRoutes.includes(router.pathname)
  const remainingPath = router.pathname.replace(/^\/profile(\/[^/]+)?/, '/profile')

  const isProtectedPage = !commonRoutes.includes(remainingPath)

  useEffect(() => {
    if (!isLoading && !user && isProtectedPage && !isFetching) {
      router.push(PATH.MAIN)

      return
    }
  }, [user, isError, isLoading, isProtectedPage, isFetching, router])

  if (isLoading || (!user && isProtectedPage)) {
    return <Loader />
  }

  return <>{children}</>
}
