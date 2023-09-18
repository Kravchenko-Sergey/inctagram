import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from './'

const meta = {
  title: 'Components/UI/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
