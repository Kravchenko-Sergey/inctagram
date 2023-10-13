import { ChangeEvent, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field'

const meta = {
  title: 'Components/UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['text', 'password'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const MainTextField: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }

    return <TextField onChange={onChange} value={value} />
  },
  args: {
    value: 'Simple text-field',
    label: 'Click here',
    disabled: false,
  },
}
export const TextFieldWithPlaceHolder: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }

    return <TextField placeholder="Type Something" onChange={onChange} value={value} />
  },
  args: {
    label: 'Click here',
    disabled: false,
    placeholder: 'Type Something',
  },
}
export const TextFieldPassword: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }

    return <TextField type="password" onChange={onChange} value={value} />
  },
  args: {
    value: '',
    label: 'Click here',
    type: 'password',
    disabled: false,
  },
}

export const TextFieldWithPlaceHolderAndSearch: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }

    return <TextField searchInput={true} onChange={onChange} value={value} />
  },
  args: {
    value: 'Simple text-field',
    label: 'Click here',
    type: 'text',
    placeholder: 'Placeholder',
    searchInput: true,
    disabled: false,
  },
}
