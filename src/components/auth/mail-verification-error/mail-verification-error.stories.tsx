import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { store } from '@/services/store'

import { MailVerificationError } from './index'

const meta = {
  title: 'Page Components/Mail Verification Error',
  component: MailVerificationError,
  tags: ['autodocs'],
} satisfies Meta<typeof MailVerificationError>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <Provider store={store}>
        <MailVerificationError {...args} />
      </Provider>
    )
  },
  args: {
    email: 'example@mail.com',
  },
}
