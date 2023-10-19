import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { store } from '@/services/store'

import { Login } from './index'

const meta = {
  title: 'Page Components/Login',
  component: Login,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=3800-11366&mode=dev',
    },
  },
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <Provider store={store}>
        <Login {...args} />
      </Provider>
    )
  },
  args: {
    onGoogleAuth: () => console.log('Google auth clicked'),
    onGithubAuth: () => console.log('GitHub auth clicked'),
  },
}
