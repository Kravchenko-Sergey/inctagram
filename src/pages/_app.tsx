import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import '@/styles/index.scss'
import '@/styles/nprogress.css'
import { useLoader } from '../../hooks/useLoader'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  // variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return <Component className={inter.className} {...pageProps} />
}
