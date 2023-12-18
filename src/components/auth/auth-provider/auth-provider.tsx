import { ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { useMeQuery } from '@/services/auth/auth-api'
import { commonRoutes, PATH } from '@/consts/route-paths'

type PropsType = {
  children: ReactNode
}

export const AuthProvider = ({ children }: PropsType) => {
  const router = useRouter()
  const { data: user, isLoading, isError, isFetching } = useMeQuery()

  // // http://localhost:3000/en/profile/&id=5&postId=391
  // // http://localhost:3000/en/profile?id=2&postId=391

  // const isProtectedPage = !commonRoutes.includes(router.pathname)
  console.log('AuthProvider')
  // const remainingPath = router.pathname.replace(/^\/profile(\/[^/]+)?/, '/profile')
  const remainingPath = router.pathname.replace(/^\/profile(\/[^/]+)?|\/profile\?(.+)/, '/profile')

  const isProtectedPage = !commonRoutes.includes(remainingPath)

  useEffect(() => {
    if (!isLoading && !user && isProtectedPage) {
      router.push(PATH.MAIN)

      return
    }
  }, [user, isProtectedPage, router, isLoading])

  // if (isLoading || (!user && isProtectedPage)) {
  //   console.log('Loader')
  //
  //   return <Loader />
  // }

  return <>{children}</>
}
