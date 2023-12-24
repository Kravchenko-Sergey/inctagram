import { ReactElement, ReactNode } from 'react'

import '@/styles/index.scss'
import '@/styles/nprogress.css'
import '@/styles/slider.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/Toast.scss'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'

import { useLoader } from '@/hooks'
import { store, useAppSelector, wrapper } from '@/services'
import { Toast } from '@/components/react-toast/toast-container'
import { AuthProvider, Loader } from '@/components'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  // variable: '--font-inter',
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)
  const isLoading = useAppSelector(state => state.appReducer.isLoadingState)

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <Provider store={store}>
        <AuthProvider>
          <Toast />
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID ?? ''}>
            {getLayout(<Component {...pageProps} />)}
          </GoogleOAuthProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}

export default wrapper.withRedux(App)
