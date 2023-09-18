import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import '@/styles/index.scss'

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  // variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={inter.className} {...pageProps} />
}
