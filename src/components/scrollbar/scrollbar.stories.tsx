import type { Meta, StoryObj } from '@storybook/react'

import s from './../sidebar/sidebar.module.scss'

import { Scrollbar } from './'

import { BookmarkOutline } from '@/assets/icons/bookmark-outline'
import { HomeOutline } from '@/assets/icons/home-outline'
import { LogOutOutline } from '@/assets/icons/log-out-outline'
import { MessageCircleOutline } from '@/assets/icons/message-circle-outline'
import { PersonOutline } from '@/assets/icons/person-outline'
import { PlusSquareOutline } from '@/assets/icons/plus-square-outline'
import { SearchIcon } from '@/assets/icons/search-icon'
import { TrendingUpOutline } from '@/assets/icons/trending-up-outline'
import { Typography } from '@/components/typography'

const meta = {
  title: 'Components/UI/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Scrollbar>

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

export const Vertical: Story = {
  args: {
    maxHeight: 100,
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
