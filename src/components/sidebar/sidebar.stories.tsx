import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from './'

import { BookmarkOutline } from '@/src/assets/icons/bookmark-outline'
import { HomeOutline } from '@/src/assets/icons/home-outline'
import { LogOutOutline } from '@/src/assets/icons/log-out-outline'
import { MessageCircleOutline } from '@/src/assets/icons/message-circle-outline'
import { PersonOutline } from '@/src/assets/icons/person-outline'
import { PlusSquareOutline } from '@/src/assets/icons/plus-square-outline'
import { SearchIcon } from '@/src/assets/icons/search-icon'
import { TrendingUpOutline } from '@/src/assets/icons/trending-up-outline'
import s from '@/src/components/sidebar/sidebar.module.scss'
import { Typography } from '@/src/components/typography'

const meta = {
  title: 'Components/UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const sidebarItems = [
  { href: '/', icon: <HomeOutline />, text: 'Home' },
  { href: '/create', icon: <PlusSquareOutline />, text: 'Create' },
  { href: '/profile', icon: <PersonOutline />, text: 'My Profile' },
  { href: '/messenger', icon: <MessageCircleOutline />, text: 'Messenger' },
  { href: '/search', icon: <SearchIcon />, text: 'Search' },
  { href: '/statistics', icon: <TrendingUpOutline />, text: 'Statistics' },
  { href: '/favorites', icon: <BookmarkOutline />, text: 'Favorites' },
  { href: '/logout', icon: <LogOutOutline />, text: 'Log Out' },
]

export const Default: Story = {
  args: {
    children: (
      <>
        {sidebarItems.map((item, index) => (
          <a key={index} href={item.href} className={s.item}>
            <>
              {item.icon}
              <Typography>{item.text}</Typography>
            </>
          </a>
        ))}
      </>
    ),
  },
}
