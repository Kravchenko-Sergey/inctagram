import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import Link from 'next/link'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_text_16'
    | 'bold_text_16'
    | 'regular_text_14'
    | 'medium_text_14'
    | 'bold_text_14'
    | 'small_text'
    | 'semi-bold_small_text'
    | 'regular_link'
    | 'small_link'
    | 'error'
  children?: ReactNode
  // href?: string
  className?: string
}

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'regular_text_14', className, as: Component = 'p', href, ...rest } = props

  if (Component === 'a' || variant === 'regular_link' || variant === 'small_link') {
    return <Link href={href} className={`${s[variant]} ${className}`} {...rest} />
  }

  return <Component className={`${s[variant]} ${className}`} {...rest} />
}
