import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

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
    href,
    as: Component = 'button',
    ...restProps
  } = props

  const classNames = {
    btn: clsx(s.btn, s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className),
  }

  if (Component === 'a' || variant === 'link' || variant === 'link-btn') {
    return (
      <Link href={href} passHref className={classNames.btn} {...restProps}>
        {children}
      </Link>
    )
  }

  return (
    <Component className={classNames.btn} {...restProps} disabled={disabled}>
      {children}
    </Component>
  )
}
