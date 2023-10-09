import { FC, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/api/auth-api/auth.api'
import { PATH } from '@/consts/route-paths'

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const { data: user, isLoading, isError, isFetching } = useMeQuery()
  const isAuthPage = router.pathname === PATH.LOGIN
  const isGithubPage = router.pathname === PATH.GITHUB

  console.log({ user })
  useEffect(() => {
    if (!isLoading && !user && !isAuthPage && !isFetching && !isGithubPage) {
      router.push(PATH.LOGIN)
    }
  }, [user, isError, isLoading, isAuthPage, isFetching, router, isGithubPage])

  if (isLoading || (!user && !isAuthPage && !isGithubPage)) {
    return <div>Loading....</div>
  }

  return <>{children}</>
}
