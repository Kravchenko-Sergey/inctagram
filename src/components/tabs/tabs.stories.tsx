import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './tabs'

// const meta: Meta<Tabs> = {
const meta = {
  title: 'Components/UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
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
