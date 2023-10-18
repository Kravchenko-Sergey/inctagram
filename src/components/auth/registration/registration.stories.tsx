import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { Registration } from './index'
import { GoogleOAuthProvider } from '@react-oauth/google'

const meta = {
  title: 'Page Components/Registration',
  component: Registration,
  tags: ['autodocs'],
} satisfies Meta<typeof Registration>

export default meta
type Story = StoryObj<typeof meta>

export const MainSignUp: Story = {
  render: () => {
    return (
      <GoogleOAuthProvider clientId="test">
        <Provider store={store}>
          <Registration />
        </Provider>
      </GoogleOAuthProvider>
    )
  },
  args: {},
}
