import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import s from './add-post-modal.module.scss'
import { Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { ArrowBack, CloseModal } from '@/assets/icons'
import { ModalType } from '@/components/posts/add-post/add-post'

type AddPostModalProps = {
  children?: ReactNode
  onOpenChange?: (value: boolean) => void
  isOpen: boolean
  onBackClick: () => void
  typeModal: ModalType
  setTypeModal: Dispatch<SetStateAction<ModalType>>
}

export const AddPostModal = ({
  children,
  isOpen,
  onBackClick,
  onOpenChange,
  setTypeModal,
  typeModal,
}: AddPostModalProps) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.dialogOverlay} />
        <Dialog.Content className={s.dialogContent}>
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
                <Typography variant="h3" className={s.next} as="a" color="link" href={PATH.CREATE}>
                  Next
                </Typography>
              </div>
            </>
          )}
          <div className={s.content}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
