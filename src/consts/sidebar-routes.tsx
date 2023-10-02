import {
  BookmarkOutline,
  HomeOutline,
  LogOutOutline,
  MessageCircleOutline,
  PersonOutline,
  PlusSquareOutline,
  SearchIcon,
  TrendingUpOutline,
} from '@/assets/icons'
import { PATH } from '@/consts/route-paths'

export const sidebarItems = [
  { href: PATH.HOME, icon: <HomeOutline />, title: 'Home' },
  // { href: PATH.CREATE, icon: <PlusSquareOutline />, title: 'Create' },
  { href: PATH.REGISTRATION, icon: <PlusSquareOutline />, title: 'Registration' },
  { href: PATH.LOGIN, icon: <PlusSquareOutline />, title: 'Login' },

  { href: PATH.PROFILE, icon: <PersonOutline />, title: 'My Profile' },
  { href: PATH.MESSENGER, icon: <MessageCircleOutline />, title: 'Messenger' },
  { href: PATH.SEARCH, icon: <SearchIcon />, title: 'Search' },
  { href: PATH.STATISTIC, icon: <TrendingUpOutline />, title: 'Statistics' },
  { href: PATH.FAVORITES, icon: <BookmarkOutline />, title: 'Favorites' },
  { href: PATH.CONFIRM, icon: <BookmarkOutline />, title: 'Confirm' },
  { href: PATH.LOGOUT, icon: <LogOutOutline />, title: 'Log Out' },
]
