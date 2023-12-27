import { memo } from 'react'
import * as SelectRadix from '@radix-ui/react-select'
import { Typography } from '@/components'
import s from '@/components/ui/select/select.module.scss'
import { clsx } from 'clsx'
import { Option } from '@/components/ui/select'

type Props = {
  options: Option[]
  variant?: 'primary' | 'pagination'
}

export const SelectContent = memo(({ options, variant = 'primary' }: Props) => {
  const classNames = {
    item: clsx(s.item, s[variant]),
    content: clsx(s.content, s[variant]),
  }

  return (
    <SelectRadix.Content className={classNames.content} position="popper">
      <SelectRadix.Viewport>
        {options.map(option => (
          <SelectRadix.Item value={option.value} className={classNames.item} key={option.value}>
            <SelectRadix.ItemText>
              <Typography as="span" className={s.active}>
                {option.label}
              </Typography>
            </SelectRadix.ItemText>
          </SelectRadix.Item>
        ))}
      </SelectRadix.Viewport>
    </SelectRadix.Content>
  )
})
