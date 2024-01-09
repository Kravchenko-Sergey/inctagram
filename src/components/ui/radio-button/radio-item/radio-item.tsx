import * as RadioGroup from '@radix-ui/react-radio-group'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import { Typography } from '@/components'
import s from './../radio-button.module.scss'

type RadioItemProps = {
  title: string
} & ComponentPropsWithoutRef<typeof RadioGroup.Item>

export const RadioItem = forwardRef<ElementRef<typeof RadioGroup.Item>, RadioItemProps>(
  ({ className, value, id, title }, ref) => {
    const classNames = {
      item: clsx(s.item, className),
      indicator: clsx(s.indicator),
    }

    return (
      <div className={s.container}>
        <RadioGroup.Item ref={ref} className={classNames.item} value={value} id={id}>
          <RadioGroup.Indicator className={classNames.indicator} />
        </RadioGroup.Item>
        <Typography htmlFor={id} as={'label'} className={s.label} variant={'regular_text_14'}>
          {title}
        </Typography>
      </div>
    )
  }
)
