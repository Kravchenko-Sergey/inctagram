import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { RecoveryLinkExpired } from '@/components/recovery-link-expired/recovery-link-expired'
import { store } from '@/store/store'

const meta = {
  title: 'Components/PasswordRecoveryResult',
  component: RecoveryLinkExpired,
  tags: ['autodocs'],
} satisfies Meta<typeof RecoveryLinkExpired>

export default meta
type Story = StoryObj<typeof meta>

export const PasswordRecoveryResult: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <RecoveryLinkExpired />
      </Provider>
    )
  },
  args: {},
}
