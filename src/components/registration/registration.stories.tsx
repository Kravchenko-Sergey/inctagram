import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { Registration } from './'

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
      <Provider store={store}>
        <Registration />
      </Provider>
    )
  },
  args: {},
}
