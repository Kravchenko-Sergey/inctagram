import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import TextArea from '@/src/components/text-area/text-area'

const meta: Meta<TextArea> = {
  title: 'Components/UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
  },
}

export const Error: Story = {
  args: {
    label: 'Some label',
    value: 'Error text',
    error: 'Some error!',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Placeholder text',
    disabled: true,
  },
}
