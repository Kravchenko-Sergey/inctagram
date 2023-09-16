import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

export type ButtonPropsType<T extends ElementType = 'button'> = {
  as?: T
  variant: 'primary' | 'secondary' | 'ghost' | 'link' | 'withIcon'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  // buttonType?: string тут тс ошибку выдает.
  children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonPropsType<T>) => {
  const {
    variant = 'primary',
    fullWidth,
    disabled,
    className,
    children,
    buttonType,
    as: Component = 'button',
    ...restProps
  } = props

  const classNames = {
    btn: clsx(s.btn, s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className),
  }

  return (
    // <Component className={classNames.btn} disabled={disabled} {...restProps} type={buttonType}> тип есть в restProps
    <Component className={classNames.btn} disabled={disabled} {...restProps}>
      {children}
    </Component>
  )
}
