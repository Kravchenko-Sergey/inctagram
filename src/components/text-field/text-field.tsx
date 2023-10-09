import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
  useCallback,
  useState,
} from 'react'

import { clsx } from 'clsx'

import { Eye, EyeClosed, SearchIcon } from '@/assets/icons'
import { Typography } from '@/components'

import s from './text-field.module.scss'

export type InputPropsType = {
  label?: string
  inputTextClassName?: string
  error?: string
  searchInput?: boolean
  width?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, InputPropsType>(
  (
    {
      className,
      error,
      inputTextClassName,
      searchInput,
      value = '',
      placeholder,
      disabled,
      onChange,
      type,
      width,
      label,
      ...restProps
    },
    ref
  ) => {
    const [iconVisible, setIconVisible] = useState(type)

    const classNames = {
      input: clsx(s.inputContainer, !!error && s.error, className),
      label: clsx(s.inputContainer, !!error && s.error, className),
      inpText: clsx(s.input, inputTextClassName),
    }

    const iconClickHandler = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIconVisible(() => (iconVisible === 'password' ? 'text' : 'password'))
      },
      [iconVisible]
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    return (
      <div className={clsx(s.main, disabled && s.disabled)} style={{ width }}>
        {label && (
          <div>
            <Typography className={s.label} color="secondary" variant="regular_text_14">
              {label}
            </Typography>
          </div>
        )}
        <div className={classNames.input}>
          {searchInput && (
            <span
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className={s.icon}
            >
              <SearchIcon />
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={classNames.inpText}
            placeholder={placeholder}
            value={value}
            type={iconVisible}
            onChange={handleChange}
            {...restProps}
          />
          {(type === 'password' || iconVisible === 'password') && (
            <button disabled={disabled} className={s.fakebutton} onClick={iconClickHandler}>
              {iconVisible === 'password' ? (
                <Eye color={disabled ? 'var(--dark-100)' : ''} />
              ) : (
                <EyeClosed color={disabled ? 'var(--dark-100)' : ''} />
              )}
            </button>
          )}
        </div>
        <div className={s.errorContainer}>
          {error && (
            <div style={{ margin: '4px 0' }}>
              <Typography color="error" variant="error">
                {error}
              </Typography>
            </div>
          )}
        </div>
      </div>
    )
  }
)
