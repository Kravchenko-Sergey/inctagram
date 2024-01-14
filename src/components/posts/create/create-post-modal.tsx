import { ChangeEvent, useState } from 'react'
import s from './create-post-modal.module.scss'
import { AppDispatch, useAppDispatch, useAppSelector } from '@/services'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal'
import {
  ImageType,
  nextPage,
  prevPage,
  setCroppedImage,
} from '@/components/posts/create/create-post-slice'
import { FilterPage } from '@/components/posts/create/edit-photo'
import { CroppedPage } from '@/components/posts/create/modal-pages/cropped-page/cropped-page'
import { PublicationPage } from '@/components/posts/create/modal-pages/publication-page/publication-page'
import { AddPhotoPage } from '@/components/posts/create/modal-pages/add-photo-page/add-photo-page'
import { ModalHeader } from '@/components/posts/create/modal-header/modal-header'
import getCroppedImg from '@/components/posts/create/cropped-image/Crop'
import { Layer2 } from '@/assets/icons/Layer 2'
import { NotificationModal } from '@/components/posts/create/notification-modal/notification-modal'
import { customerTable } from '@/components/posts/create/database.config'

type CreatePostModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const showCroppedImg = async (addedImages: ImageType[], dispatch: AppDispatch) => {
  let result: ImageType[] = []

  try {
    {
      const croppedImg = addedImages.map(async el => {
        const res = await getCroppedImg(el.img, el.crop)

        if (res) {
          dispatch(setCroppedImage({ img: res, id: el.id }))
          result.push({ ...el, img: res })
        }
      })

      await Promise.all(croppedImg)

      return result
    }
  } catch (e) {
    console.log(e)
  }
}

export const CreatePostModal = ({ setOpen, open }: CreatePostModalProps) => {
  const [openNotification, setOpenNotification] = useState(false)
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.createPost.page)
  const addedImages = useAppSelector(state => state.createPost.croppedImages)

  const onNextPage = () => dispatch(nextPage())
  const onPrevPage = () => dispatch(prevPage())

  const AddPhotoHeader: HeaderContent = { type: 'title', title: 'Add Photo' }

  const onCroppedHandler = async () => {
    await showCroppedImg(addedImages, dispatch)
    dispatch(nextPage())
  }

  const onCloseModalHandler = () => {
    setOpenNotification(true)
  }
  // const showCroppedImg = async () => {
  //   try {
  //     {
  //       const croppedImg = addedImages.map(async el => {
  //         const res = await getCroppedImg(el.img, el.crop)
  //
  //         if (res) {
  //           dispatch(setCroppedImage({ img: res, id: el.id }))
  //         }
  //       })
  //
  //       await Promise.all(croppedImg)
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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
