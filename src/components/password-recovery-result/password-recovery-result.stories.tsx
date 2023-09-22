import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import PasswordRecoveryResultPageComponent from '@/components/password-recovery-result/password-recovery-result'
import { store } from '@/store/store'

const meta = {
  title: 'Components/PasswordRecoveryResult',
  component: PasswordRecoveryResultPageComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordRecoveryResultPageComponent>

export default meta
type Story = StoryObj<typeof meta>

export const PasswordRecoveryResult: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <PasswordRecoveryResultPageComponent />
      </Provider>
    )
  },
  args: {},
}
