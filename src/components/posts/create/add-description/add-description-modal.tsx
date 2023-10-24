import React, { ComponentProps, FC, ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from './add-description-modal.module.scss'

import { Button, Typography } from '@/components'
import { ImageType } from '@/components/posts/create/create-post-modal'
import { useTranslation } from '@/hooks'
import { ArrowBack } from '@/assets/icons'
import getFilteredImg from '@/components/posts/create/edit-photo/filters/Filter'

export type ModalProps = {
  image: string | null
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  isFiltersModalOpen: boolean
  setIsFiltersModalOpen: (isFiltersModalOpen: boolean) => void
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  setOpenSureModal: (openSureModal: boolean) => void
  addedImages: ImageType[]
  setAddedImages: (addedImages: Awaited<{ image: string }>[]) => void
} & ComponentProps<'div'>

export const DescriptionModal: FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  image,
  addedImages,
  setAddedImages,
  activeFilter,
  setActiveFilter,
  isFiltersModalOpen,
  setIsFiltersModalOpen,
  showSeparator = true,
  onAction,
  onCancel,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  setOpenSureModal,
}) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
  }
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const { t } = useTranslation()
  const actionButtonHandler = () => {
    onAction?.()
  }
  const cancelButtonHandler = () => {
    onCancel?.()
  }

  const handleBackClick = () => {
    setIsDescriptionModalOpen(false)
    setIsFiltersModalOpen(true)
  }

  const handlePublish = () => {
    setIsDescriptionModalOpen(true)
  }

  const showFilteredImg = async (activeFilter: string) => {
    try {
      const updatedImages = await Promise.all(
        addedImages.map(async (el, idx) => {
          const filteredImage = await getFilteredImg(el.image, activeFilter)

          return {
            image: filteredImage as string,
          }
        })
      )

      setAddedImages(updatedImages)
      setActiveFilter('')
      setIsFiltersModalOpen(false)
      setIsDescriptionModalOpen(false)
      setIsModalOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Button variant="primary" className={s.nextButton} onClick={handlePublish}>
        {'Next'}
      </Button>
      <Dialog open={isDescriptionModalOpen} onOpenChange={open => !open && setOpenSureModal(true)}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={handleBackClick}>
                <ArrowBack />
              </button>
              <div className={s.next}>
                <Button
                  type={'submit'}
                  form={'form1'}
                  variant="primary"
                  className={s.nextButton}
                  onClick={() => showFilteredImg(activeFilter)}
                >
                  {'Publish'}
                </Button>
              </div>
              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
                <Separator className={classNames.separator} />
              </DialogTitle>
            </div>

            <div className={s.contentBox}>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}
