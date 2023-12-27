import React, { ReactNode } from 'react'
import s from './modal-header.module.scss'
type HeaderProps = {
  left: { title: string | ReactNode; callBack: () => void }
  title: string
  right: { title: string | ReactNode; callBack?: () => void }
}

export const ModalHeader = ({ right, title, left }: HeaderProps) => {
  return (
    <>
      <button className={s.buttonLeft} onClick={left.callBack}>
        {left.title}
      </button>
      <p className={s.title}>{title}</p>
      <button className={s.buttonRight} onClick={right.callBack}>
        {right.title}
      </button>
    </>
  )
}
