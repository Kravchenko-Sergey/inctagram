import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { ArrowBack, CloseModal } from '@/assets/icons'
import { ModalType } from '@/components/posts/add-post/add-post'
import { clsx } from 'clsx'
import s from './modal-post.module.scss'

type ModalPostProps = {
  children?: ReactNode
  onOpenChange?: (value: boolean) => void
  isOpen: boolean
  onBackClick: () => void
  transitionHandler: () => void
  typeModal: ModalType
  className?: string
  classNameContainer?: string
}

export const ModalPost = ({
  children,
  isOpen,
  onBackClick,
  onOpenChange,
  typeModal,
  className,
  classNameContainer,
  transitionHandler,
}: ModalPostProps) => {
  const classNames = {
    container: clsx(s.dialogContent, className && className),
    content: clsx(s.content, classNameContainer && classNameContainer),
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content
          className={classNames.container}
          style={{ width: typeModal === 'Filters' || typeModal === 'Publication' ? '972px' : '' }}
        >
          {typeModal === 'Add Photo' ? (
            <div className={s.headerAddFile}>
              <Dialog.Title>
                <Typography variant="h1">{typeModal}</Typography>
              </Dialog.Title>
              <Dialog.Close className={s.iconButton} aria-label="Close">
                <CloseModal />
              </Dialog.Close>
            </div>
          ) : (
            <>
              <div className={s.header}>
                <div onClick={onBackClick} className={s.backIcon}>
                  <ArrowBack />
                </div>
                <Dialog.Title>
                  <Typography variant="h1">{typeModal}</Typography>
                </Dialog.Title>
                <Typography
                  onClick={transitionHandler}
                  variant="h3"
                  className={s.next}
                  color="link"
                >
                  {typeModal == 'Publication' ? 'Publish' : 'Next'}
                </Typography>
              </div>
            </>
          )}
          <div className={classNames.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
