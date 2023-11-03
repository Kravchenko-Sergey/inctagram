import { ComponentProps, ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import { useTranslation } from '@/hooks'
import { Button, Typography } from '@/components'
import { ImageType } from '@/components/posts/create/create-post-modal'
import { ArrowBack } from '@/assets/icons'
import {
  PostDescription,
  DescriptionModal,
  FilteredImages,
} from '@/components/posts/create/add-description'

import s from './filters-modal.module.scss'

export type ModalProps = {
  image: string | null
  isModalOpen: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | null) => void
  openSureModal: boolean
  setOpenSureModal: (openSureModal: boolean) => void
  setIsModalOpen: (open: boolean) => void
} & ComponentProps<'div'>

export const FiltersModal = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  isModalOpen,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  activeFilter,
  setActiveFilter,
  setOpenSureModal,
  setIsBaseModalOpen,
  setIsModalOpen,
}: ModalProps) => {
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
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

  const { t } = useTranslation()

  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onBackHandler() {
    setIsFiltersModalOpen(false)
    setIsModalOpen(true)
  }

  const handleNext = () => {
    setIsFiltersModalOpen(true)
    setIsBaseModalOpen(false)
    //setIsModalOpen(false)
  }

  return (
    <div>
      <Button variant="link" className={s.nextButton} onClick={handleNext}>
        {t.post.addNewPost.next}
      </Button>
      <Dialog open={isFiltersModalOpen} onOpenChange={open => !open && setOpenSureModal(true)}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={onBackHandler}>
                <ArrowBack />
              </button>
              <div className={s.next}>
                <DescriptionModal
                  image={image}
                  addedImages={addedImages}
                  setAddedImages={setAddedImages}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  onCancel={cancelButtonHandler}
                  title={t.post.addNewPost.publication}
                  isFiltersModalOpen={isFiltersModalOpen}
                  setIsFiltersModalOpen={setIsFiltersModalOpen}
                  setOpenSureModal={setOpenSureModal}
                >
                  <FilteredImages addedImages={addedImages} activeFilter={activeFilter} />
                  <PostDescription addedImages={addedImages} />
                </DescriptionModal>
              </div>

              <DialogTitle className={s.DialogTitle}>
                <Typography variant="h1">{title}</Typography>
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
