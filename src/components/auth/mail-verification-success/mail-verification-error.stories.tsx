import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { store } from '@/services/store'

import { MailVerificationSuccess } from './index'

const meta = {
  title: 'Page Components/Mail Verification Success',
  component: MailVerificationSuccess,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=301-5874&mode=dev',
    },
  },
} satisfies Meta<typeof MailVerificationSuccess>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <Provider store={store}>
        <MailVerificationSuccess {...args} />
      </Provider>
    )
  },
  args: {
    email: 'example@mail.com',
  },
}
