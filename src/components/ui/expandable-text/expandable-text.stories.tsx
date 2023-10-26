import type { Meta, StoryObj } from '@storybook/react'

import { ExpandableText } from './index'

const meta = {
  title: 'UI Components/ExpandableText',
  component: ExpandableText,
  tags: ['autodocs'],
  args: {
    text: 'Lorem ipsum dolorem lorem ipsum dolorem lorem ipsum dolorem lorem ipsum dolorem lorem ipsum dolorem',
  },
} satisfies Meta<typeof ExpandableText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
