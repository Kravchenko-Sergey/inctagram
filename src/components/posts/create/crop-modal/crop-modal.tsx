import { ComponentProps, ReactNode, useRef, useState } from 'react'

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
import { Typography } from '@/components'
import { ImageType } from '@/components/posts/create'
import { ArrowBack } from '@/assets/icons'
import { AreYouSureModal } from '../are-you-sure'
import s from './crop-modal.module.scss'
import { SelectedImages, FiltersModal } from '../edit-photo'

export type ModalProps = {
  image: string | null
  open: boolean
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
  isBaseModalOpen: boolean
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | null) => void
} & ComponentProps<'div'>

export const CropModal = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  isBaseModalOpen,
  setIsBaseModalOpen,
  setImage,
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
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState('')
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const areYouSureRef = useRef(null)

  const { t } = useTranslation()

  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCancelHandler() {
    setIsModalOpen(false)
    setIsBaseModalOpen(true)
    setAddedImages([])
  }

  return (
    <div>
      {isModalOpen && (
        <Dialog open={open} onOpenChange={open => !open && setOpenSureModal(true)}>
          <DialogPortal>
            <DialogOverlay className={s.DialogOverlay} />
            <DialogContent className={classNames.content}>
              <div className={s.titleWrapper} id="titleWrap">
                <button className={s.arrowButton} onClick={onCancelHandler}>
                  <ArrowBack />
                </button>
                <div className={s.nextButton}>
                  <FiltersModal
                    image={image}
                    addedImages={addedImages}
                    setAddedImages={setAddedImages}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onCancel={cancelButtonHandler}
                    title={t.addNewPost.filters}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    setIsBaseModalOpen={setIsBaseModalOpen}
                    setImage={setImage}
                    openSureModal={openSureModal}
                    setOpenSureModal={setOpenSureModal}
                  >
                    <SelectedImages
                      image={image}
                      addedImages={addedImages}
                      setActiveFilter={setActiveFilter}
                      activeFilter={activeFilter}
                      setAddedImages={setAddedImages}
                    />
                  </FiltersModal>
                </div>
                <DialogTitle className={s.DialogTitle}>
                  <Typography variant="h1">{title}</Typography>
                  <Separator className={classNames.separator} />
                </DialogTitle>
              </div>
              <div ref={areYouSureRef}>
                <AreYouSureModal
                  openSureModal={openSureModal}
                  setOpenSureModal={setOpenSureModal}
                  setIsModalOpen={setIsModalOpen}
                  setIsBaseModalOpen={setIsBaseModalOpen}
                  setImage={setImage}
                />
              </div>
              <div className={s.contentBox}>{children}</div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

// export default CropModal // do not export this , instead use dynamic import "Modal" for js bundle reduce
