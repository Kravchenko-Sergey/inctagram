import type { Meta, StoryObj } from '@storybook/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { Provider } from 'react-redux'
import { store } from '@/services/store'

import { Login } from './index'

const meta = {
  title: 'Page Components/Login',
  component: Login,
  tags: ['autodocs'],
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <GoogleOAuthProvider clientId="test">
        <Provider store={store}>
          <Login {...args} />
        </Provider>
      </GoogleOAuthProvider>
    )
  },
}
