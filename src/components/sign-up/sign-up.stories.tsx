import { ChangeEvent, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { SignUp } from '@/components/sign-up/sign-up'
import { store } from '@/store/store'

const meta = {
  title: 'Components/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const MainSignUp: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <SignUp />
      </Provider>
    )
  },
  args: {},
}
