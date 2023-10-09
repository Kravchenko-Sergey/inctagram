import { ReactElement, ReactNode } from 'react'

import '@/styles/index.scss'
import '@/styles/nprogress.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'

<<<<<<< Updated upstream
import { useLoader } from '@/hooks'
import { store } from '@/store'
=======
import { useLoader } from '@/hooks/useLoader'
import { store } from '@/store/store'
import { AuthProvider } from '@/components/auth-provider'
>>>>>>> Stashed changes

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <Provider store={store}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID ?? ''}>
            {getLayout(<Component {...pageProps} />)}
          </GoogleOAuthProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}
