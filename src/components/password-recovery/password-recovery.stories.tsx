import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import PasswordRecoveryPageComponent from '@/components/password-recovery/password-recovery'
import { store } from '@/store/store'

const meta = {
  title: 'Components/PasswordRecovery',
  component: PasswordRecoveryPageComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordRecoveryPageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const PasswordRecovery: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <PasswordRecoveryPageComponent />
      </Provider>
    )
  },
  args: {},
}
