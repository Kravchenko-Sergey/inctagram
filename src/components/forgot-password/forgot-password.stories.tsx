import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import ForgotPasswordPageComponent from '@/components/forgot-password/forgot-password'
import { store } from '@/store/store'

const meta = {
  title: 'Components/ForgotPassword',
  component: ForgotPasswordPageComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordPageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPassword: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <ForgotPasswordPageComponent />
      </Provider>
    )
  },
  args: {},
}
