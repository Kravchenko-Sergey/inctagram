import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { ForgotPasswordForm } from './'

const meta = {
  title: 'Page Components/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    )
  },
  args: {},
}
