import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from './index'

const meta = {
  title: 'Components/UI/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=3663-9424&mode=dev',
    },
  },
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
