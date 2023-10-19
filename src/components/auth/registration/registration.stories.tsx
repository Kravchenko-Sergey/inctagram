import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { Registration } from './index'
import { GoogleOAuthProvider } from '@react-oauth/google'

const meta = {
  title: 'Page Components/Registration',
  component: Registration,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=1632-8892&mode=dev',
    },
  },
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
