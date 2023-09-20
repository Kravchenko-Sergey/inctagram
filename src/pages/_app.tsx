import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import '@/styles/index.scss'
import '@/styles/nprogress.css'
import { Provider } from 'react-redux'
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
    <Provider store={store}>
      <Component className={inter.className} {...pageProps} />
    </Provider>
  )
}
