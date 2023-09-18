import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '../components/sidebar/sidebar.module.scss'

import { BookmarkOutline } from '@/assets/icons/bookmark-outline'
import { HomeOutline } from '@/assets/icons/home-outline'
import { LogOutOutline } from '@/assets/icons/log-out-outline'
import { MessageCircleOutline } from '@/assets/icons/message-circle-outline'
import { PersonOutline } from '@/assets/icons/person-outline'
import { PlusSquareOutline } from '@/assets/icons/plus-square-outline'
import { SearchIcon } from '@/assets/icons/search-icon'
import { TrendingUpOutline } from '@/assets/icons/trending-up-outline'
import { HeadMeta } from '@/components/head-meta'
import { Sidebar } from '@/components/sidebar'
import { Typography } from '@/components/typography'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

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
