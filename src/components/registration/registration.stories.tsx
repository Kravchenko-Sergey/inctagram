import { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { Registration } from '@/components/registration/registration'
import { store } from '@/store/store'

const meta = {
  title: 'Components/Registration',
  component: Registration,
  tags: ['autodocs'],
} satisfies Meta<typeof Registration>

export default meta
type Story = StoryObj<typeof meta>

export const MainSignUp: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <Registration />
      </Provider>
    )
  },
  args: {},
}
