import { useEffect } from 'react'

import { useRouter } from 'next/router'
// eslint-disable-next-line import/no-named-as-default
import NProgress from 'nprogress'
import { useAppDispatch } from '@/services'
import { isLoading } from '@/services/slices/slice'

export const useLoader = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const startLoading = () => {
      NProgress.start()
      dispatch(isLoading({ value: true }))
    }
    const endLoading = () => {
      NProgress.done()
      dispatch(isLoading({ value: false }))
    }

    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', endLoading)
    router.events.on('routeChangeError', endLoading)

    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', endLoading)
      router.events.off('routeChangeError', endLoading)
    }
  }, [dispatch, router])
}
