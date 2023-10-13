import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from './button.module.scss'

export type ButtonPropsType<T extends ElementType = 'button'> = {
  as?: T
  variant: 'primary' | 'secondary' | 'ghost' | 'link' | 'withIcon' | 'link-btn'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<T>

const ButtonPolymorph = <T extends ElementType = 'button'>(props: ButtonPropsType<T>, ref: any) => {
  const {
    variant = 'primary',
    fullWidth,
    disabled,
    className,
    children,
    as: Component = 'button',
    ...restProps
  } = props

  const classNames = {
    btn: clsx(s.btn, s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className),
  }

  return (
    <Component className={classNames.btn} {...restProps} disabled={disabled} ref={ref}>
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType>(
  props: ButtonPropsType<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonPropsType<T>> & {
      ref?: ForwardedRef<ElementType<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
