import { useState } from 'react'

import { SelectProps } from '@radix-ui/react-select'
import type { Meta } from '@storybook/react'

import { Select } from './'

export default {
  title: 'Components/UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

const optionsPrimary = [
  {
    value: 'Apple',
    label: 'Apple',
  },
  {
    value: 'Banana',
    label: 'Banana',
  },
  {
    value: 'Blueberry',
    label: 'Blueberry',
  },
  {
    value: 'Grapes',
    label: 'Grapes',
  },
]
const optionsPagination = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
]

export const Simple = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return <Select options={optionsPrimary} {...args} value={value} onChange={setValue} />
  },

  args: {
    options: optionsPrimary,
  },
}

export const SimpleWithLabel = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return <Select options={optionsPrimary} {...args} value={value} onChange={setValue} />
  },

  args: {
    // placeholder: 'select...',
    options: optionsPrimary,
    label: 'Select',
  },
}

export const Error = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return <Select options={optionsPrimary} {...args} value={value} onChange={setValue} />
  },

  args: {
    placeholder: 'select...',
    options: optionsPrimary,
    label: 'Select',
    errorMessage: 'error',
  },
}
export const Pagination = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return <Select options={optionsPagination} {...args} value={value} onChange={setValue} />
  },

  args: {
    options: optionsPagination,
    label: 'pagination',
    variant: 'pagination',
    placeholder: '1',
  },
}

export const FullWidth = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState('')

    return <Select options={optionsPrimary} {...args} value={value} onChange={setValue} />
  },

  args: {
    options: optionsPrimary,
    variant: 'primary',
    width: '100%',
  },
}
