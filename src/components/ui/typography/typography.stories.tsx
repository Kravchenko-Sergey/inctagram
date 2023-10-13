import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './index'

const meta = {
  title: 'Components/UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular_text_16',
        'bold_text_16',
        'regular_text_14',
        'medium_text_14',
        'bold_text_14',
        'small_text',
        'semi_bold_small_text',
        'regular_link',
        'small_link',
        'error',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Text content Large',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    children: 'Text content H1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: 'Text content H2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: 'Text content H3',
    variant: 'h3',
  },
}

export const regular_text_16: Story = {
  args: {
    children: 'Text content regular_text_16',
    variant: 'regular_text_16',
  },
}

export const bold_text_16: Story = {
  args: {
    children: 'Text content bold_text_16',
    variant: 'bold_text_16',
  },
}

export const regular_text_14: Story = {
  args: {
    children: 'Text content regular_text_14',
    variant: 'regular_text_14',
  },
}

export const medium_text_14: Story = {
  args: {
    children: 'Text content medium_text_14',
    variant: 'medium_text_14',
  },
}

export const bold_text_14: Story = {
  args: {
    children: 'Text content bold_text_14',
    variant: 'bold_text_14',
  },
}

export const small_text: Story = {
  args: {
    children: 'Text content small_text',
    variant: 'small_text',
  },
}

export const semi_bold_small_text: Story = {
  args: {
    children: 'Text content semi_bold_small_text',
    variant: 'semi-bold_small_text',
  },
}

export const regular_link: Story = {
  args: {
    children: 'Text content regular_link',
    variant: 'regular_link',
  },
}

export const small_link: Story = {
  args: {
    children: 'Text content small_link',
    variant: 'small_link',
  },
}

export const Error: Story = {
  args: {
    children: 'Text content Error',
    variant: 'error',
  },
}
