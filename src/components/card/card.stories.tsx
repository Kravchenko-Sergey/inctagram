import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta: Meta<Card> = {
  title: 'Components/UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
}
