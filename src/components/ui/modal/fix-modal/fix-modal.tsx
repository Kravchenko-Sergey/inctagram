import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'

import { CloseModal } from '@/assets/icons'
import { Card, Typography } from '@/components'

import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './fix-modal.module.scss'

type TitleContent = { type: 'title'; title: string }
type NodeContent = { type: 'node'; node: ReactNode }

export type HeaderContent = TitleContent | NodeContent

export type ModalType = {
  headerContent?: HeaderContent
  className?: string
} & ComponentPropsWithoutRef<typeof Dialog.Root>

export const FixModal = forwardRef<ElementRef<typeof Dialog.Overlay>, ModalType>(
  ({ open, children, headerContent, className, ...restProps }, ref) => {
    const classNames = {
      container: clsx(s.dialogContent, className && className),
      content: clsx(s.content),
      closeButton: clsx(s.iconButton),
    }

    return (
      <Dialog.Root open={open} {...restProps}>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className={s.dialogOverlay} ref={ref} />
            <Dialog.Content className={classNames.container}>
              <Card>
                <div className={s.header}>
                  {headerContent?.type === 'title' && (
                    <>
                      <Dialog.Title>
                        <Typography variant={'h1'}>{headerContent.title}</Typography>
                      </Dialog.Title>
                      <Dialog.Close className={classNames.closeButton} aria-label={'Close'}>
                        <CloseModal />
                      </Dialog.Close>
                    </>
                  )}
                  {headerContent?.type === 'node' && <>{headerContent.node}</>}
                </div>
                <div className={classNames.content}>{children}</div>
              </Card>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    )
  }
)
