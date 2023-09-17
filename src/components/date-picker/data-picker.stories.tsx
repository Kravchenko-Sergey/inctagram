import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { DataPicker, DatePickerProps } from '@/src/components/date-picker/data-picker'

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
