import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import '@/styles/index.scss'
import '@/styles/nprogress.css'
import { Provider } from 'react-redux'

import { MainLayout } from '@/components/main-layout/main-layout'
import { useLoader } from '@/hooks/useLoader'
import { store } from '@/store/store'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  // variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <Provider store={store}>
        <MainLayout className={inter.className}>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  )
}
