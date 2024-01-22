import { ReactNode, useEffect } from 'react'

import { getSidebarLayout, Header, Loader } from '@/components'

import s from './main-layout.module.scss'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'
import { useAppDispatch, useAppSelector } from '@/services'
import { isInitialized } from '@/services/slices/slice'

type LayoutProps = {
  className?: string
  children?: ReactNode
}

const MainLayout = ({ className, children }: LayoutProps) => {
  const WrappedComponent = getSidebarLayout(children)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isInit = useAppSelector(state => state.appReducer.isInitialized)

  useEffect(() => {
    setTimeout(() => {
      dispatch(isInitialized({ value: false }))
    }, 1000)
  }, [dispatch])

  return (
    <div className={className}>
      {router.route === PATH.HOME && isInit && <Loader />}
      <Header />
      <div className={s.flexContainer}>{WrappedComponent}</div>
      {/*{authorized && <Footer />}*/}
    </div>
  )
}

// export const getMainLayout = (page: ReactElement) => {
export const getMainLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>
}
