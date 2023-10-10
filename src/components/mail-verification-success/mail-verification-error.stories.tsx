import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { store } from '@/store'

import { MailVerificationSuccess } from './'

const meta = {
  title: 'Page Components/Mail Verification Success',
  component: MailVerificationSuccess,
  tags: ['autodocs'],
} satisfies Meta<typeof MailVerificationSuccess>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <Provider store={store}>
        <MailVerificationSuccess {...args} />
      </Provider>
    )
  },
  args: {
    email: 'example@mail.com',
  },
}
