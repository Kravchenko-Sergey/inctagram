import { Meta, StoryObj } from '@storybook/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { SocialMediaAuth } from './index'

const meta = {
  title: 'Page Components/SocialMediaAuth',
  component: SocialMediaAuth,
  tags: ['autodocs'],
} satisfies Meta<typeof SocialMediaAuth>

export default meta
type Story = StoryObj<typeof meta>

export const SocialMediaAuthIcons: Story = {
  render: () => {
    return (
      <GoogleOAuthProvider clientId="test">
        <Provider store={store}>
          <SocialMediaAuth />
        </Provider>
      </GoogleOAuthProvider>
    )
  },
  args: {},
}
