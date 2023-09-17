import Link from 'next/link'

import { HeadMeta } from '@/src/components/head-meta'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <HeadMeta title="Home" />
      <main>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sign-in">Sign in</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </main>
    </>
  )
}
