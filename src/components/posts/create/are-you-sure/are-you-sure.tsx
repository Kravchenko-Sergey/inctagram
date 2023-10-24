import React, { FC } from 'react'

import { Typography } from '@/components'
import { useTranslation } from '@/hooks'
import { BaseModal } from '@/components/posts/create/base-modal/base-modal'

export type ModalProps = {
  openSureModal: boolean

  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | null) => void
}

export const AreYouSureModal: FC<ModalProps> = ({
  openSureModal,
  setOpenSureModal,
  setIsModalOpen,
  setIsBaseModalOpen,
  setImage,
}) => {
  const { t } = useTranslation()
  const onModalClose = () => {
    setOpenSureModal(false)
  }

  const discardHandler = () => {
    setOpenSureModal(false)
    setIsModalOpen(false)
    setIsBaseModalOpen(true)
    setImage(null)
  }

  return (
    <div hidden={!openSureModal}>
      <BaseModal
        id={'areYouSureModal'}
        modalWidth={'sm'}
        title={'Close'}
        open={openSureModal}
        cancelButtonName={'SaveDraft'}
        actionButtonName={'Discard'}
        onClose={onModalClose}
        onCancel={onModalClose}
        onAction={discardHandler}
      >
        <Typography variant={'h3'}>{'Are You Sure'}</Typography>
      </BaseModal>
    </div>
  )
}
