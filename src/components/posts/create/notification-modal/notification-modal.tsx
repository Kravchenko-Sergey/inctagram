import React, { useState } from 'react'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal'
import { Button, Typography } from '@/components'
import { useTranslation } from '@/hooks'
import s from './notification-modal.module.scss'
import { customerTable } from '@/components/posts/create/database.config'
import { useAppSelector } from '@/services'

const header: HeaderContent = { type: 'title', title: 'Close' }

type NotificationModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  closeOtherModal: (open: boolean) => void
}

export const NotificationModal = ({ setOpen, open, closeOtherModal }: NotificationModalProps) => {
  const { t } = useTranslation()
  const addedImages = useAppSelector(state => state.createPost.croppedImages)

  const onCloseAllHandler = async () => {
    setOpen(false)
    closeOtherModal(false)
    await customerTable.bulkAdd(addedImages)
  }

  const onCloseNotificationHandler = () => {
    closeOtherModal(false)
    setOpen(false)
  }

  return (
    <FixModal
      open={open}
      onOpenChange={setOpen}
      headerContent={header}
      className={s.modalContainer}
    >
      <Typography variant="h3">{t.post.edit.areYouSure}</Typography>
      <div className={s.buttonContainer}>
        <Button variant={'ghost'} onClick={onCloseNotificationHandler}>
          {t.post.edit.closePost}
        </Button>
        <Button variant={'primary'} as={'button'} onClick={onCloseAllHandler}>
          {t.post.edit.saveChanges}
        </Button>
      </div>
    </FixModal>
  )
}
