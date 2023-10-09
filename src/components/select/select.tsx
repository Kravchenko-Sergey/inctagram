import { CSSProperties, forwardRef, ReactElement } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { Typography } from '@/components'

import s from './select.module.scss'

import { ArrowDownIcon } from '@/assets/icons'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from '@/hooks/use-translation'

export type Option = { label: string | ReactElement; value: string }

type ConditionalMultipleProps = {
  multiple?: true
  value: string | ReactElement
  onChange: (value: string) => void
}

type CommonProps = {
  className?: string
  disabled?: boolean
  secondary?: boolean
  name?: string
  placeholder?: string | ReactElement
  required?: boolean
  variant?: 'primary' | 'pagination'
  options: Option[]
  portal?: boolean
  errorMessage?: string
  label?: string
  width?: CSSProperties['width']
  rootClassName?: string
}
export type SelectProps = CommonProps & ConditionalMultipleProps

export const Select = forwardRef<FieldValues, SelectProps>(
  (
    {
      variant = 'primary',
      placeholder,
      value,
      disabled,
      className,
      onChange,
      secondary,
      errorMessage,
      options,
      label,
      rootClassName,
      width,
    },
    ref
  ) => {
    const { t } = useTranslation()
    const showError = !!errorMessage && errorMessage.length > 0
    const classNames = {
      root: rootClassName,
      trigger: clsx(
        s.trigger,
        s[variant],
        showError && s.error,
        secondary && s.secondary,
        className
      ),
      icon: clsx(s.icon, s[variant]),
      item: clsx(s.item, s[variant]),
      content: clsx(s.content, s[variant]),
      label: clsx(s.label, disabled && s.disabled),
    }
    const withoutPlaceholder = variant === 'pagination' ? value : t.components.selectPlaceholder
    const rootStyles = { width }

    return (
      <div className={classNames.root}>
        <Typography variant={'regular_text_16'} as="label" className={classNames.label}>
          {label}
        </Typography>
        <SelectRadix.Root disabled={disabled} onValueChange={onChange}>
          <SelectRadix.Trigger className={classNames.trigger} style={rootStyles}>
            <SelectRadix.Value placeholder={placeholder || withoutPlaceholder}>
              {value}
            </SelectRadix.Value>
            <SelectRadix.Icon className={classNames.icon}>
              <ArrowDownIcon size={variant === 'pagination' ? 16 : 24} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content className={classNames.content} position={'popper'}>
              <SelectRadix.Viewport>
                {options.map(option => (
                  <SelectRadix.Item
                    value={option.value}
                    className={classNames.item}
                    key={option.value}
                  >
                    <SelectRadix.ItemText>
                      <Typography as="span" className={s.active}>
                        {option.label}
                      </Typography>
                    </SelectRadix.ItemText>
                  </SelectRadix.Item>
                ))}
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
          <div className={s.errorContainer}>
            {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
          </div>
        </SelectRadix.Root>
      </div>
    )
  }
)
