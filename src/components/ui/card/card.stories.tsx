import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './index'

const meta = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
}