import { FC, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/services/auth/auth.api'
import { PATH, commonRoutes } from '@/consts/route-paths'
import { Loader } from '@/components/ui/loader'

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
    return <Loader />
  }

  return <>{children}</>
}
