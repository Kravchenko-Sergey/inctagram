import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

const meta = {
  title: 'UI Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=306-7411&mode=dev',
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const tabsList = [
  { value: 'tab1', title: 'Account' },
  { value: 'tab2', title: 'Submit' },
  { value: 'tab3', title: 'Change' },
  { value: 'tab4', title: 'Password', disabled: true },
  { value: 'tab5', title: 'Email', disabled: true },
]

export const Large: Story = {
  args: {
    tabsList: tabsList,
  },
}
