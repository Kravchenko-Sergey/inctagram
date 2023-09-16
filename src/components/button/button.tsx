import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

export type ButtonPropsType<T extends ElementType = 'button'> = {
  as?: T
  variant: 'primary' | 'secondary' | 'ghost' | 'link'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonPropsType<T>) => {
  const {
    variant = 'primary',
    fullWidth,
    disabled,
    className,
    as: Component = 'button',
    ...restProps
  } = props

  const classNames = {
    btn: clsx(s.btn, s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className),
  }

  return <Component className={classNames.btn} disabled={disabled} {...restProps} />
}
