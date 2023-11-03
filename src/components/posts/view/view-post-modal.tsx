import { useState } from 'react'

import { Loader, Modal } from '@/components'
import { useGetProfileQuery } from '@/services/profile'
import { Post } from '@/services/posts'
import { PostModalHeader } from './post-modal-header'
import { PostInfo } from './post-info'
import { EditPostModal } from '../edit-post-modal'

import s from './view-post-modal.module.scss'

type PropsType = {
  isOpen: boolean
  post: Post
  handleModalChange: (value: boolean) => void
}

export const ViewPostModal = ({ isOpen, handleModalChange, post }: PropsType) => {
  const { data: profile, isLoading } = useGetProfileQuery({ profileId: post?.ownerId })
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditModalChange = () => setIsEditMode(false)

  const handleCloseModal = () => {
    handleModalChange(false)
  }

  const handleOpenEditMode = () => {
    setIsEditMode(true)
    handleCloseModal()
  }

  if (isLoading) {
    return <Loader />
  }

  const fullUserName = profile?.fullName ?? profile?.userName

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        contentClassName={s.contentModal}
        closeButtonClass={s.modalCloseButton}
        postHeader={
          <PostModalHeader
            handleOpenEditMode={handleOpenEditMode}
            userName={fullUserName}
            avatar={profile?.avatars[1]?.url}
            post={post}
          />
        }
      >
        {/* <Slider/> */}
        <PostInfo userName={fullUserName} avatar={profile?.avatars[1]?.url} post={post} />
      </Modal>
      <EditPostModal
        isOpen={isEditMode}
        handleClose={handleEditModalChange}
        post={post}
        userName={fullUserName}
        avatar={profile?.avatars[1]?.url}
      />
    </>
  )
}
