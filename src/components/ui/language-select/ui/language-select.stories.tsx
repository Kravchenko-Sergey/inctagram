import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSelect } from './language-select'

const meta = {
  title: 'UI Components/LanguageSelect',
  component: LanguageSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
