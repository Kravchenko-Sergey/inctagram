import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './index'

const meta = {
  title: 'Components/UI/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'label',
    children: <input />,
  },
}
