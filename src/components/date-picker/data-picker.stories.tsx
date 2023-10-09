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
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    return <DataPicker setStartDate={setStartDate} startDate={startDate} />
  },

  args: {
    setStartDate: () => {},
    startDate: null,
  },
}

export const Range: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date())

    const [endDate, setEndDate] = useState<Date | null>(
      startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
    )

    return (
      <DataPicker
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    )
  },

  args: {
    setStartDate: () => {},
    startDate: null,
  },
}
