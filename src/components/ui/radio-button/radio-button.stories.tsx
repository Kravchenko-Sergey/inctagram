import { Meta, StoryObj } from '@storybook/react'
import { RadioButton, RadioGroupProps } from '@/components/ui/radio-button/radio-button'
import { useState } from 'react'

const options = [
  { title: 'cat', value: 'cat' },
  { title: 'dog', value: 'dog' },
  { title: 'frog', value: 'frog' },
]

export default {
  title: 'UI Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>

export const RadioButtonWithState = {
  render: (args: RadioGroupProps) => {
    const [value, setValue] = useState('')
    const radioButtonHandler = (item: string) => {
      setValue(item)
    }

    return <RadioButton {...args} value={value} onValueChange={radioButtonHandler} />
  },

  args: {
    options: options,
    defaultValue: 'cat',
  },
}
