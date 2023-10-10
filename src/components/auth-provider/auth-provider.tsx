import { FC, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/api/auth-api/auth.api'
import { PATH, commonRoutes } from '@/consts/route-paths'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const { data: user, isLoading, isError, isFetching } = useMeQuery()
  const isProtectedPage = !commonRoutes.includes(router.pathname)

  useEffect(() => {
    if (!isLoading && !user && isProtectedPage && !isFetching) {
      router.push(PATH.LOGIN)
    }
  }, [user, isError, isLoading, isProtectedPage, isFetching, router])

  if (isLoading || (!user && isProtectedPage)) {
    return <div>Loading....</div>
  }

  return <>{children}</>
}
