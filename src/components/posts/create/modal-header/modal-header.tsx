import React from 'react'

type HeaderProps = {
  left: { title: string; callBack: () => void }
  title: string
  right: { title: string; callBack?: () => void }
}

export const ModalHeader = ({ right, title, left }: HeaderProps) => {
  return (
    <>
      <button onClick={left.callBack}>{left.title}</button>
      <p>{title}</p>
      <button onClick={right.callBack}>{right.title}</button>
    </>
  )
}
