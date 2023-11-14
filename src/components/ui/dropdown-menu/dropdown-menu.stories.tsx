import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from './index'

const meta = {
  title: 'UI Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    align: 'start',
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
