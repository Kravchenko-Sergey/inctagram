import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { RecoveryLinkExpired } from '@/components'
import { store } from '@/services/store'

const meta = {
  title: 'Page Components/PasswordRecoveryResult',
  component: RecoveryLinkExpired,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=335-6767&mode=dev',
    },
  },
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
