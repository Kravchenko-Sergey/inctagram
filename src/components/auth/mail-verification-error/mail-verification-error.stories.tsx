import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { store } from '@/services/store'

import { MailVerificationError } from './index'

const meta = {
  title: 'Page Components/Mail Verification Error',
  component: MailVerificationError,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=301-6009&mode=dev',
    },
  },
} satisfies Meta<typeof MailVerificationError>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <Provider store={store}>
        <MailVerificationError {...args} />
      </Provider>
    )
  },
  args: {
    email: 'example@mail.com',
  },
}
