import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { RadioItem } from '@/components/ui/radio-button/radio-item/radio-item'

type Options = {
  title: string
  value: string
}

export type RadioGroupProps = {
  options: Options[]
  className?: string
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>

export const RadioButton = forwardRef<ElementRef<typeof RadioGroup.Root>, RadioGroupProps>(
  ({ onValueChange, options, defaultValue, className }, ref) => {
    const buttons = options.map(el => (
      <RadioItem value={el.value} key={el.title} id={el.value} title={el.title} />
    ))

    return (
      <RadioGroup.Root
        ref={ref}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        className={className}
      >
        {buttons}
      </RadioGroup.Root>
    )
  }
)
