import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { CreateNewPassword } from '@/components/create-new-password'
import { store } from '@/store/store'

const meta = {
  title: 'Components/CreateNewPassword',
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
