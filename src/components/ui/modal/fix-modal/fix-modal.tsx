import {ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode} from 'react'

import { CloseModal } from '@/assets/icons'
import { Card, Typography } from '@/components'

import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './fix-modal.module.scss'


type TitleContent = { type: 'title'; title: string };
type NodeContent = { type: 'node'; node: ReactNode };

export type HeaderContent = TitleContent | NodeContent;

export type FixModalType = {
  className?: string
  headerContent?:HeaderContent

} & ComponentPropsWithoutRef<typeof Dialog.Root>

export const FixModal = forwardRef<ElementRef<typeof Dialog.Overlay>, FixModalType>(
  ({
       open,
       children,
       className,
        headerContent,
       ...restProps },
         ref
  ) => {
    const classNames = {
      container: clsx(s.dialogContent),
      content: clsx(className ?  className : s.content  ),
      closeButton: clsx(s.iconButton),
    }

    return (
      <Dialog.Root open={open} {...restProps}>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className={s.dialogOverlay} ref={ref} forceMount  />
            <Dialog.Content className={classNames.container}>
              <div>
                <Card>
                    {headerContent &&
                        <div className={s.header}>
                            {
                                headerContent.type === 'title' &&
                                <>
                                <Dialog.Title>
                                    <Typography variant="h1">{headerContent.title}</Typography>
                                </Dialog.Title>
                                <Dialog.Close className={classNames.closeButton} aria-label="Close">
                                    <CloseModal />
                                </Dialog.Close>
                            </>
                            }
                            {headerContent.type === 'node' && <>{headerContent.node}</>}
                        </div>
                    }
                  <div className={classNames.content}>{children}</div>
                </Card>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    )
  }
)
// const classNames = {
//   container: clsx(s.dialogContent, className && className),
//   content: clsx(s.content, contentClassName && contentClassName),
//   closeButton: clsx(s.iconButton, closeButtonClass && closeButtonClass),
// }
