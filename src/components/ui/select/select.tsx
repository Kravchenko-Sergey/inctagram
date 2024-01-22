import { CSSProperties, ElementRef, forwardRef, ReactElement } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { Typography } from '@/components/ui/typography'

import { ArrowDownIcon } from '@/assets/icons'
import { useTranslation } from '@/hooks'

import s from './select.module.scss'
import { SelectContent } from '@/components/ui/select/select-content/select-content'

export type Option = { label: string | ReactElement; value: string }

type ConditionalMultipleProps = {
  multiple?: true
  value: string | ReactElement
  onChange: (value: string) => void
}

type CommonProps = {
  className?: string
  onBlur?: () => void
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

export const Select = forwardRef<ElementRef<typeof SelectRadix.Root>, SelectProps>(
  (
    {
      variant = 'primary',
      placeholder,
      onBlur,
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
      portal = true,
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
      label: clsx(s.label, disabled && s.disabled),
    }
    const withoutPlaceholder = variant === 'pagination' ? value : t.components.selectPlaceholder
    const rootStyles = { width }

    return (
      <div className={classNames.root}>
        <Typography variant="regular_text_16" as="label" className={classNames.label}>
          {label}
        </Typography>
        <SelectRadix.Root value={value as any} disabled={disabled} onValueChange={onChange}>
          <SelectRadix.Trigger
            onBlur={onBlur}
            ref={ref}
            className={classNames.trigger}
            style={rootStyles}
          >
            <SelectRadix.Value placeholder={placeholder || withoutPlaceholder}>
              {value}
            </SelectRadix.Value>
            <SelectRadix.Icon className={classNames.icon}>
              <ArrowDownIcon size={variant === 'pagination' ? 16 : 24} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          {portal ? (
            <SelectRadix.Portal>
              <SelectContent options={options} variant={variant} />
            </SelectRadix.Portal>
          ) : (
            <SelectContent options={options} variant={variant} />
          )}
          <div className={s.errorContainer}>
            {showError && <Typography variant="error">{errorMessage}</Typography>}
          </div>
        </SelectRadix.Root>
      </div>
    )
  }
)
