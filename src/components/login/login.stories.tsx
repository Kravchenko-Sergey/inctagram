import type { Meta, StoryObj } from '@storybook/react'

import { Login } from './'

const meta = {
  title: 'Page Components/Login',
  component: Login,
  tags: ['autodocs'],
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onGoogleAuth: () => console.log('Google auth clicked'),
    onGithubAuth: () => console.log('GitHub auth clicked'),
  },
}
