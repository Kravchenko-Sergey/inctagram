import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { ForgotPasswordForm } from './index'

const meta = {
  title: 'Page Components/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=314-5891&mode=dev',
    },
  },
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    )
  },
  args: {},
}
