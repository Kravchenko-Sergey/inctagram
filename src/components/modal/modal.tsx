import { ComponentProps, FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './modal.module.scss'

import { CloseModal } from '@/assets/icons'

export type ModalType = {
  children?: ReactNode
  title?: string
  onOpenChange?: (value: boolean) => void
  isOpen: boolean
} & ComponentProps<'div'>

export const Modal: FC<ModalType> = ({ children, title, onOpenChange, isOpen, className }) => {
  const classNames = clsx(s.DialogContent, className && className)

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.DialogOverlay} />
        <Dialog.Content className={classNames}>
          <div className={s.header}>
            <Dialog.Title>
              <Typography variant={'h1'}>{title}</Typography>
            </Dialog.Title>
            <Dialog.Close className={s.IconButton} aria-label={'Close'}>
              <CloseModal />
            </Dialog.Close>
          </div>
          <div className={s.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
