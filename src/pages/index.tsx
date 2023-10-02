import { HeadMeta } from '@/components/head-meta'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const router = useRouter()

  // const sidebarItems = [
  //   { href: PATH.HOME, icon: <HomeOutline />, title: 'Home' },
  //   // { href: PATH.CREATE, icon: <PlusSquareOutline />, title: 'Create' },
  //   { href: PATH.REGISTRATION, icon: <PlusSquareOutline />, title: 'Registration' },
  //   { href: PATH.PROFILE, icon: <PersonOutline />, title: 'My Profile' },
  //   { href: PATH.MESSENGER, icon: <MessageCircleOutline />, title: 'Messenger' },
  //   { href: PATH.SEARCH, icon: <SearchIcon />, title: 'Search' },
  //   { href: PATH.STATISTIC, icon: <TrendingUpOutline />, title: 'Statistics' },
  //   { href: PATH.FAVORITES, icon: <BookmarkOutline />, title: 'Favorites' },
  //   { href: PATH.LOGOUT, icon: <LogOutOutline />, title: 'Log Out' },
  // ]

  return (
    <>
      <HeadMeta title="Home" />
      <div>Home</div>
      {/*<main>*/}
      {/*  <Sidebar>*/}
      {/*    {sidebarItems.map((item, index) => (*/}
      {/*      <Link*/}
      {/*        key={index}*/}
      {/*        href={item.href}*/}
      {/*        className={`${s.item} ${router.pathname === item.href ? s.active : ''}`}*/}
      {/*      >*/}
      {/*        <>*/}
      {/*          {item.icon}*/}
      {/*          <Typography>{item.title}</Typography>*/}
      {/*        </>*/}
      {/*      </Link>*/}
      {/*    ))}*/}
      {/*  </Sidebar>*/}
      {/*</main>*/}
    </>
  )
}
