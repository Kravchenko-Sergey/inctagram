import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
  useCallback,
  useState,
} from 'react'

import { clsx } from 'clsx'

import cls from './input.module.scss'

import { Eye } from '@/src/assets/icons/eye'
import { EyeClosed } from '@/src/assets/icons/eye-closed'
import { SearchIcon } from '@/src/assets/icons/search-icon'

export type InputPropsType = {
  label?: string
  inputTextClassName?: string
  // type?: string
  error?: string
  searchInput?: boolean
  width?: string
  // callback?: () => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputPropsType>(
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
      // callback,
      ...restProps
    },
    ref
  ) => {
    const [iconVisible, setIconVisible] = useState(type)

    const classNames = {
      input: clsx(cls.inputContainer, !!error && cls.error, className),
      label: clsx(cls.inputContainer, !!error && cls.error, className),
      inpText: clsx(cls.input, inputTextClassName),
    }

    const iconClickHandler = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // setIsClickedDown(true)
        setIconVisible(() => (iconVisible === 'password' ? 'text' : 'password'))
      },
      [iconVisible]
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    return (
      <div className={clsx(cls.main, disabled && cls.disabled)} style={{ width }}>
        {label && (
          <div>
            {/*<Typography className={cls.label} variant="regular_14">*/}
            <p>{label}</p>
            {/*</Typography>*/}
          </div>
        )}
        <div className={classNames.input}>
          {searchInput && (
            <span
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className={cls.icon}
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
            <button disabled={disabled} className={cls.fakebutton} onClick={iconClickHandler}>
              {iconVisible === 'password' ? (
                <Eye color={disabled ? 'var(--dark-100)' : ''} />
              ) : (
                <EyeClosed color={disabled ? 'var(--dark-100)' : ''} />
              )}
            </button>
          )}
        </div>
        <div className={cls.errorContainer}>
          {error && (
            <div style={{ margin: '4px 0' }}>
              {/*<Typography color="error" variant="small_text">*/}
              <p>{error}</p>
              {/*</Typography>*/}
            </div>
          )}
        </div>
      </div>
    )
  }
)
