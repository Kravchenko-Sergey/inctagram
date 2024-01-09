import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Slider from 'react-slick'
import Image from 'next/image'
import { Avatar, Button, ControlledTextArea, Modal, Typography } from '@/components'
import { PostImageType, useDeletePostImageMutation, useEditPostMutation } from '@/services/posts'
import { useTranslation } from '@/hooks'
import { FormFields, getSliderSettings, triggerZodFieldError } from '@/helpers'
import { MAX_CHARS_POST } from '@/consts/input-limits'
import { DescriptionFormType, descriptionSchema } from '@/schemas'
import s from './edit-post-modal.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { DeleteIcon } from '@/assets/icons'
import { PostProfile } from '@/services/public-posts'

type PropsType = {
  isOpen: boolean
  post: PostProfile
  handleClose: () => void
  userName?: string
  avatar?: string
}

export const EditPostModal = ({ post, isOpen, handleClose, userName, avatar }: PropsType) => {
  const [isCancelEdit, setIsCancelEdit] = useState(false)
  const id = useId()
  const { t } = useTranslation()
  const [editPost] = useEditPostMutation()
  const [deletePostImage] = useDeletePostImageMutation()

  const settings = getSliderSettings(s.dots)

  const handleDeletePostImage = async (uploadId: string) => {
    try {
      await deletePostImage({ imageId: uploadId }).unwrap()
    } catch (error: unknown) {
      console.error(`Some error occured when delete post with id ${post.id}, ${error}`)
    }
  }

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { touchedFields },
  } = useForm<DescriptionFormType>({
    resolver: zodResolver(descriptionSchema(t)),
    mode: 'onChange',
    defaultValues: {
      description: post?.description ? post.description : '',
    },
  })

  const onSubmit = async () => {
    try {
      const description = getValues().description

      if (description === post.description) {
        handleClose()

        return
      }

      await editPost({ description, postId: post.id }).unwrap()
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickOutside = () => {
    const description = getValues().description

    if (description === post.description) {
      return handleClose()
    }

    setIsCancelEdit(true)
  }

  const handleConfirmEditModal = () => {
    handleClose()
    handleCloseConfirmModal()
  }

  const handleCloseConfirmModal = () => setIsCancelEdit(false)

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleClickOutside}
        contentClassName={s.contentModal}
        closeButtonClass={s.modalCloseButton}
        title={t.post.edit.title}
        onInteractOutside={handleClickOutside}
      >
        <Slider {...settings} className={s.container}>
          {post?.images.map((image: PostImageType, idx: number) => {
            if (!(idx % 2)) {
              return (
                <div key={image.uploadId} className={s.carousel}>
                  <DeleteIcon
                    className={s.deleteImage}
                    onClick={() => handleDeletePostImage(image.uploadId)}
                  />
                  <Image alt="img" src={image.url} width={490} height={503} />
                </div>
              )
            }
          })}
        </Slider>
        <div className={s.wrap}>
          <div className={s.userInfo}>
            <Avatar photo={avatar} size={36} className={s.avatar} />
            <Typography variant="h3">{userName}</Typography>
          </div>

          <form id={id} className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.mainContent}>
              <ControlledTextArea
                autoFocus
                counter={MAX_CHARS_POST}
                control={control}
                classNameTextArea={s.textArea}
                name="description"
                label={t.post.edit.addDescription}
              />
            </div>
          </form>
          <Button form={id} variant="primary" className={s.submitButton}>
            {t.post.edit.saveChanges}
          </Button>
        </div>
      </Modal>

      <Modal
        contentClassName={s.contentConfirmModal}
        isOpen={isCancelEdit}
        onOpenChange={handleCloseConfirmModal}
        title={t.post.edit.closePost}
      >
        <Typography variant="regular_text_16"> {t.post.edit.areYouSure}</Typography>
        <div className={s.options}>
          <Button variant="ghost" onClick={handleConfirmEditModal}>
            {t.yes}
          </Button>
          <Button variant="primary" onClick={handleCloseConfirmModal}>
            {t.no}
          </Button>
        </div>
      </Modal>
    </>
  )
}
