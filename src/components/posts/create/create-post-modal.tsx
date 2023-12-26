import { useState } from 'react'
import s from './create-post-modal.module.scss'
import { useAppDispatch, useAppSelector } from '@/services'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal'
import { nextPage, prevPage } from '@/components/posts/create/create-post-slice'
import { FilterPage } from '@/components/posts/create/edit-photo'
import { CroppedPage } from '@/components/posts/create/modal-pages/cropped-page/cropped-page'
import { PublicationPage } from '@/components/posts/create/modal-pages/publication-page/publication-page'
import { AddPhotoPage } from '@/components/posts/create/modal-pages/add-photo-page/add-photo-page'
import { ModalHeader } from '@/components/posts/create/modal-header/modal-header'

export const CreatePostModal = () => {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.createPost.page)

  const onNextPage = () => dispatch(nextPage())
  const onPrevPage = () => dispatch(prevPage())

  const AddPhotoHeader: HeaderContent = { type: 'title', title: 'Add Photo' }

  const CroppedPhotoHeader: HeaderContent = {
    type: 'node',
    node: (
      <ModalHeader
        left={{ title: '<', callBack: onPrevPage }}
        title={'Cropped'}
        right={{ title: 'next', callBack: onNextPage }}
      />
    ),
  }

  const ChangeFilterHeader: HeaderContent = {
    type: 'node',
    node: (
      <ModalHeader
        left={{ title: '<', callBack: onPrevPage }}
        title={'Filter'}
        right={{ title: 'next', callBack: onNextPage }}
      />
    ),
  }

  const PublicationHeader: HeaderContent = {
    type: 'node',
    node: (
      <ModalHeader
        left={{ title: '<', callBack: onPrevPage }}
        title={'Filter'}
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

  return (
    <div className={s.container}>
      <button onClick={() => setOpen(true)}>open</button>
      <FixModal open={open} onOpenChange={setOpen} headerContent={modalContent[page].header}>
        <div>{modalContent[page].children}</div>
      </FixModal>
    </div>
  )
}
