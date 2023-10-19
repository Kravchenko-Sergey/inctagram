import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './index'

const meta = {
  title: 'Components/UI/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=314-5903&mode=dev',
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
