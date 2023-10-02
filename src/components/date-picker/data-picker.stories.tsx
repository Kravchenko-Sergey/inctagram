import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { DataPicker, DatePickerProps } from '@/components/date-picker/data-picker'

const meta = {
  title: 'Components/DataPicker',
  component: DataPicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DataPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args: DatePickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    return <DataPicker setStartDate={setStartDate} startDate={startDate} />
  },

  args: {
    setStartDate: () => {},
    startDate: null,
  },
}
export const Range: Story = {
  render: (args: DatePickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(startDate?.getDate() + 5)

    return <DataPicker setStartDate={setStartDate} startDate={startDate} />
  },

  args: {
    setStartDate: () => {},
    startDate: null,
  },
}
