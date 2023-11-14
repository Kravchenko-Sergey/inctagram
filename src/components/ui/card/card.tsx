import { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type HeaderProps = ComponentPropsWithoutRef<'div'>

export const Card = ({ className, ...rest }: HeaderProps) => {
  const classNames = clsx(s.card, className)

  return <div className={classNames} {...rest} />
}
