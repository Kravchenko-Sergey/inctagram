import { ComponentProps, FC, ReactNode } from 'react'

import { CloseModal } from '@/assets/icons'
import { Typography } from '@/components'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './modal.module.scss'

export type ModalType = {
  children?: ReactNode
  title?: string
  onOpenChange?: (value: boolean) => void
  isOpen: boolean
} & ComponentProps<'div'>

export const Modal: FC<ModalType> = ({ children, title, onOpenChange, isOpen, className }) => {
  const classNames = clsx(s.dialogContent, className && className)

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={classNames}>
          <div className={s.header}>
            <Dialog.Title>
              <Typography variant="h1">{title}</Typography>
            </Dialog.Title>
            <Dialog.Close className={s.iconButton} aria-label="Close">
              <CloseModal />
            </Dialog.Close>
          </div>
          <div className={s.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
