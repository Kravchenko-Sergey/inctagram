import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '../components/sidebar/sidebar.module.scss'

import { BookmarkOutline } from '@/src/assets/icons/bookmark-outline'
import { HomeOutline } from '@/src/assets/icons/home-outline'
import { LogOutOutline } from '@/src/assets/icons/log-out-outline'
import { MessageCircleOutline } from '@/src/assets/icons/message-circle-outline'
import { PersonOutline } from '@/src/assets/icons/person-outline'
import { PlusSquareOutline } from '@/src/assets/icons/plus-square-outline'
import { SearchIcon } from '@/src/assets/icons/search-icon'
import { TrendingUpOutline } from '@/src/assets/icons/trending-up-outline'
import { Sidebar } from '@/src/components/sidebar'
import { Typography } from '@/src/components/typography'
import { HeadMeta } from '@/src/components/head-meta'

const sidebarItems = [
  { href: '/', icon: <HomeOutline />, title: 'Home' },
  { href: '/create', icon: <PlusSquareOutline />, title: 'Create' },
  { href: '/profile', icon: <PersonOutline />, title: 'My Profile' },
  { href: '/messenger', icon: <MessageCircleOutline />, title: 'Messenger' },
  { href: '/search', icon: <SearchIcon />, title: 'Search' },
  { href: '/statistics', icon: <TrendingUpOutline />, title: 'Statistics' },
  { href: '/favorites', icon: <BookmarkOutline />, title: 'Favorites' },
  { href: '/logout', icon: <LogOutOutline />, title: 'Log Out' },
]

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  return (
    <>
      <HeadMeta title="Home" />
      <main>
        <Sidebar>
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${s.item} ${router.pathname === item.href ? s.active : ''}`}
            >
              <>
                {item.icon}
                <Typography>{item.title}</Typography>
              </>
            </Link>
          ))}
        </Sidebar>
      </main>
    </>
  )
}
