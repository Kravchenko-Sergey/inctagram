import type { Meta, StoryObj } from '@storybook/react'

import { Scrollbar } from './index'

import s from './scrollbar.module.scss'

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
import { Typography } from '@/components'

const meta = {
  title: 'UI Components/Scrollbar',
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
