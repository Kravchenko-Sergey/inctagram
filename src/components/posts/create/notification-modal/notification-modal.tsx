import React, { useEffect, useState } from 'react'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal'
import { Button, Typography } from '@/components'
import { useTranslation } from '@/hooks'
import s from './notification-modal.module.scss'
import database, { draftTable, pageTable } from '@/components/posts/create/database.config'
import { useAppDispatch, useAppSelector } from '@/services'
import { showCroppedImg } from '@/components/posts/create/create-post-modal'
import { resetState } from '@/components/posts/create/create-post-slice'

const header: HeaderContent = { type: 'title', title: 'Close' }

type NotificationModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  closeOtherModal: (open: boolean) => void
}

export const NotificationModal = ({ setOpen, open, closeOtherModal }: NotificationModalProps) => {
  const { t } = useTranslation()
  const addedImages = useAppSelector(state => state.createPost.croppedImages)

  const page = useAppSelector(state => state.createPost.page)
  const dispatch = useAppDispatch()

  const onCloseAllHandler = async () => {
    let images

    // проверка для того ,тобы обрезание фотографии происходило всегда только 1 раз
    if (page === 1) {
      images = await showCroppedImg(addedImages, dispatch)
    } else {
      images = addedImages
    }
    setOpen(false)
    closeOtherModal(false)

    if (images) {
      await database.open()
      await draftTable.bulkAdd(images)
      await pageTable.bulkAdd([{ page }])
      localStorage.setItem('save-in-db', 'true')
      dispatch(resetState())
    }
  }

  const onCloseNotificationHandler = () => {

    closeOtherModal(false)
    setOpen(false)
    database.delete()
    localStorage.removeItem('save-in-db')
    dispatch(resetState())
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
