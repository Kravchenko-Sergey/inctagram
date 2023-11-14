import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './index'

const meta = {
  title: 'UI Components/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
