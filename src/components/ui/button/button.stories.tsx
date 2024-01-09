import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta = {
  title: 'UI Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost', 'link', 'link-btn'],
      control: { type: 'inline-radio-button' },
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=303-3570&mode=dev',
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

export const LinkAsButton: Story = {
  args: {
    variant: 'link-btn',
    children: 'Button as link',
    as: 'a',
    href: '',
  },
}
