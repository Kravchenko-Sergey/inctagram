import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { CreateNewPassword } from './index'

const meta = {
  title: 'Page Components/CreateNewPassword',
  component: CreateNewPassword,
  tags: ['autodocs'],
  args: {
    code: 'test',
  },
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordForm: Story = {
  render: args => {
    return (
      <Provider store={store}>
        <CreateNewPassword {...args} />
      </Provider>
    )
  },
  args: {},
}
