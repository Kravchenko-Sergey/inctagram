import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export type HeaderProps = ComponentPropsWithoutRef<'div'>

export const Card: FC<HeaderProps> = ({ className, ...rest }) => {
  const classNames = clsx(s.card, className)

  return <div className={classNames} {...rest} />
  // return <div className={`${s.card} ${classNameclassName}`} {...rest} />
}
