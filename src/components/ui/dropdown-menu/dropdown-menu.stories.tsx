import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from './index'
import { POST_OPTIONS } from '@/consts/dropdown-menu-options'

const meta = {
  title: 'UI Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    options: POST_OPTIONS,
    align: 'start',
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
