import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

import { Check } from '@/assets/icons/check'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  onBlur?: () => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
  position?: 'left'
  errorMessage?: string
}

export const CheckboxItem = ({
  checked,
  onChange,
  disabled,
  required,
  position,
  className,
  onBlur,
  label,
  id,
  errorMessage,
}: CheckboxProps) => {
  const classNames = {
    container: clsx(s.container, className),
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    root: s.root,
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className={classNames.container}>
        <LabelRadix.Root asChild>
          <Typography className={s.wrap} as={'label'} variant="regular_text_14">
            <div className={classNames.buttonWrapper}>
              <CheckboxRadix.Root
                onBlur={onBlur}
                className={classNames.root}
                checked={checked}
                onCheckedChange={onChange}
                disabled={disabled}
                required={required}
                id={id}
              >
                {checked && (
                  <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                    <Check disabled={disabled ? disabled : false} />
                  </CheckboxRadix.Indicator>
                )}
              </CheckboxRadix.Root>
            </div>
            {label}
          </Typography>
        </LabelRadix.Root>
      </div>
      {errorMessage && (
        <Typography variant="error" className={s.errorMessage}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
