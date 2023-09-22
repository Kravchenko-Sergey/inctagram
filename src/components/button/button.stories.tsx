import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary button',
    disabled: false,
  },
}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary button',
    disabled: false,
  },
}
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost button',
    disabled: false,
  },
}
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full width button',
    disabled: false,
    fullWidth: true,
  },
}
export const AsLink: Story = {
  args: {
    variant: 'link',
    children: 'Link as a button',
    as: 'a',
    href: '',
  },
}
export const LinkBtn: Story = {
  args: {
    variant: 'link-btn',
    children: 'Link as a button with button appearance',
    href: '',
  },
}
