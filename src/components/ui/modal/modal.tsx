import { ComponentProps, ReactElement, ReactNode } from 'react'

import { CloseModal } from '@/assets/icons'
import { Typography } from '@/components'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './modal.module.scss'

export type ModalType = {
  content?: ReactElement
  children?: ReactNode
  title?: string
  onOpenChange?: (value: boolean) => void
  contentClassName?: string
  closeButtonClass?: string
  isOpen: boolean
  postHeader?: ReactNode
} & ComponentProps<'div'>

export const Modal = ({
  content,
  children,
  contentClassName,
  title,
  onOpenChange,
  isOpen,
  postHeader,
  className,
  closeButtonClass,
}: ModalType) => {
  const classNames = {
    container: clsx(s.dialogContent, className && className),
    content: clsx(s.content, contentClassName && contentClassName),
    closeButton: clsx(s.iconButton, closeButtonClass && closeButtonClass),
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={classNames.container}>
          {content}
          <div>
            <div className={s.header}>
              <Dialog.Title>
                {postHeader ?? <Typography variant="h1">{title}</Typography>}
              </Dialog.Title>
              <Dialog.Close className={classNames.closeButton} aria-label="Close">
                <CloseModal />
              </Dialog.Close>
            </div>
            <div className={classNames.content}>{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
