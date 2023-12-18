import { useState } from 'react'

import { Button, Loader, Modal, Typography } from '@/components'
import { useGetProfileQuery } from '@/services/profile'
import { useDeletePostImageMutation, useDeleteUserPostMutation } from '@/services/posts'
import { PostModalHeader } from './post-modal-header'
import { PostInfo } from './post-info'
import { EditPostModal } from '../edit-post-modal'
import { Slider } from './slider'

import s from './view-post-modal.module.scss'
import { useTranslation } from '@/hooks'
import { PostProfile, useGetProfileDataQuery } from '@/services/public-posts'
import { useMeQuery } from '@/services/auth'

type PropsType = {
  isOpen: boolean
  // post: Post
  post: PostProfile
  handleModalChange: (value: boolean) => void
}

export const ViewPostModal = ({ isOpen, handleModalChange, post }: PropsType) => {
  const { t } = useTranslation()
  const { data: me } = useMeQuery() // TODO сделать хук на проверку принадлежности страницы

  // // // const { data: profile, isLoading } = useGetProfileQuery({ profileId: post?.ownerId })

  const { data: profile, isLoading } = useGetProfileDataQuery({ userId: post?.ownerId })

  const isMyPage = me?.userId == profile?.profile.id

  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [deletePost] = useDeleteUserPostMutation()
  const [deletePostImage] = useDeletePostImageMutation()

  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: post.id }).unwrap()
      await deletePostImage({ imageId: post?.images[0]?.uploadId }).unwrap()
    } catch (error: unknown) {
      console.error(`Some error occured when delete post with id ${post.id}, ${error}`)
    }
  }

  const handleEditModalChange = () => {
    setIsEditMode(false)
    handleModalChange(true)
  }

  const handleCloseModal = () => handleModalChange(false)

  const handleOpenEditMode = () => {
    setIsEditMode(true)
    handleCloseModal()
  }

  const handleDeleteMode = () => setIsDeleteModalOpen(true)

  const handleCancelDeletePost = () => setIsDeleteModalOpen(false)

  if (isLoading) {
    return <Loader />
  }

  const fullUserName = profile?.fullName ?? profile?.profile.userName

  return (
    <>
      <Modal
        className={s.modalContainer}
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        contentClassName={s.contentModal}
        closeButtonClass={s.modalCloseButton}
        postHeader={
          <PostModalHeader
            isMyPage={isMyPage}
            handleOpenEditMode={handleOpenEditMode}
            handleDeleteMode={handleDeleteMode}
            userName={fullUserName}
            avatar={profile?.profile.avatars[1]?.url}
          />
        }
        additionalContent={<Slider post={post} />}
      >
        <PostInfo userName={fullUserName} avatar={profile?.profile.avatars[1]?.url} post={post} />
      </Modal>
      <EditPostModal
        isOpen={isEditMode}
        handleClose={handleEditModalChange}
        post={post}
        userName={fullUserName}
        avatar={profile?.profile.avatars[1]?.url}
      />
      <Modal
        className={s.contentDeleteModal}
        isOpen={isDeleteModalOpen}
        onOpenChange={handleCancelDeletePost}
        contentClassName={s.contentModal}
        postHeader={<Typography variant="h3">{t.post.deletePost}</Typography>}
      >
        <Typography variant="h3">{t.post.areYouSureToDelete}</Typography>
        <div className={s.deleteOptions}>
          <Button variant="primary" onClick={handleDeletePost}>
            <Typography variant="h3">{t.yes}</Typography>
          </Button>
          <Button variant="ghost" onClick={handleCancelDeletePost}>
            <Typography variant="h3">{t.no}</Typography>
          </Button>
        </div>
      </Modal>
    </>
  )
}
