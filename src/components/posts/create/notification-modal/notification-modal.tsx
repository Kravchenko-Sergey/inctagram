import React, { useState } from 'react'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal'
import { Button, Typography } from '@/components'
import { useTranslation } from '@/hooks'
import s from './notification-modal.module.scss'
import database, { customerTable } from '@/components/posts/create/database.config'
import { useAppDispatch, useAppSelector } from '@/services'
import {showCroppedImg} from "@/components/posts/create/create-post-modal";
import {resetState} from "@/components/posts/create/create-post-slice";

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

    let images = await showCroppedImg(addedImages, dispatch)
    setOpen(false)
    closeOtherModal(false)

    if (images) {
      await database.open()
      await customerTable.bulkAdd(images)
      dispatch(resetState())
    }
  }

  const onCloseNotificationHandler = () => {
    closeOtherModal(false)
    setOpen(false)
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
