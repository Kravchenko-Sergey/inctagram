import { useState } from 'react'
import s from './create-post-modal.module.scss'
import { AppDispatch, useAppDispatch, useAppSelector } from '@/services'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal'
import { nextPage, prevPage } from '@/components/posts/create/create-post-slice'
import { FilterPage } from '@/components/posts/create/edit-photo'
import { CroppedPage } from '@/components/posts/create/modal-pages/cropped-page/cropped-page'
import { PublicationPage } from '@/components/posts/create/modal-pages/publication-page/publication-page'
import { AddPhotoPage } from '@/components/posts/create/modal-pages/add-photo-page/add-photo-page'
import { ModalHeader } from '@/components/posts/create/modal-header/modal-header'

import { Layer2 } from '@/assets/icons/Layer 2'
import { NotificationModal } from '@/components/posts/create/notification-modal/notification-modal'
import { saveCropping } from '@/components/posts/create/DTO/save-cropping-dto'

type CreatePostModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CreatePostModal = ({ setOpen, open }: CreatePostModalProps) => {
  const [openNotification, setOpenNotification] = useState(false)
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.createPost.page)
  const addedImages = useAppSelector(state => state.createPost.croppedImages)

  const onNextPage = () => dispatch(nextPage())
  const onPrevPage = () => dispatch(prevPage())

  const onCroppedHandler = async () => {
    await saveCropping(addedImages, dispatch)
    dispatch(nextPage())
  }

  const onCloseModalHandler = () => {
    // закрытие первого окна на крестик
    if (page === 0) {
      setOpen(false)
    } else {
      setOpenNotification(true)
    }
  }

  const AddPhotoHeader: HeaderContent = { type: 'title', title: 'Add Photo' }

  const CroppedPhotoHeader: HeaderContent = {
    type: 'node',
    node: (
      <ModalHeader
        left={{ title: <Layer2 />, callBack: onPrevPage }}
        title={'Cropped'}
        right={{ title: 'Next', callBack: onCroppedHandler }}
      />
    ),
  }

  const ChangeFilterHeader: HeaderContent = {
    type: 'node',
    node: (
      <ModalHeader
        left={{ title: <Layer2 />, callBack: onPrevPage }}
        title={'Filter'}
        right={{ title: 'Next', callBack: onNextPage }}
      />
    ),
  }

  const PublicationHeader: HeaderContent = {
    type: 'node',
    node: (
      <ModalHeader
        left={{ title: <Layer2 />, callBack: onPrevPage }}
        title={'Publication'}
        right={{ title: '' }}
      />
    ),
  }

  const modalContent = [
    { header: AddPhotoHeader, children: <AddPhotoPage /> },
    { header: CroppedPhotoHeader, children: <CroppedPage /> },
    { header: ChangeFilterHeader, children: <FilterPage /> },
    { header: PublicationHeader, children: <PublicationPage /> },
  ]

  const classNames = [
    `${s.addPhotoContainer}`,
    `${s.CroppedPageContainer}`,
    `${s.filterContainer}`,
    `${s.publishContainer}`,
  ]

  return (
    <div className={s.container}>
      <FixModal
        open={open}
        className={classNames[page]}
        onOpenChange={onCloseModalHandler}
        headerContent={modalContent[page].header}
      >
        {modalContent[page].children}
      </FixModal>
      <NotificationModal
        closeOtherModal={setOpen}
        open={openNotification}
        setOpen={setOpenNotification}
      />
    </div>
  )
}
