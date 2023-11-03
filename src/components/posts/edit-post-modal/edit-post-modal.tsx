import { useEffect, useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Slider from 'react-slick'
import Image from 'next/image'

import { Avatar, Button, ControlledTextArea, Modal, Typography } from '@/components'
import { Image as ImageType, Post, useEditPostMutation } from '@/services/posts'
import { useTranslation } from '@/hooks'
import { FormFields, triggerZodFieldError } from '@/helpers'
import { MAX_CHARS_POST } from '@/consts/input-limits'
import { DescriptionFormType, descriptionSchema } from '@/schemas'

import s from './edit-post-modal.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type PropsType = {
  isOpen: boolean
  post: Post
  handleClose: () => void
  userName?: string
  avatar?: string
}

const settings = {
  dots: true,
  swipe: false,
  arrows: true,
  dotsClass: `slick-dots ${s.dots}`,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: 15 }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: 15, zIndex: 1 }}
      onClick={onClick}
    />
  )
}

export const EditPostModal = ({ post, isOpen, handleClose, userName, avatar }: PropsType) => {
  const id = useId()
  const { t } = useTranslation()
  const [editPost] = useEditPostMutation()

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
      description: post.description,
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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      contentClassName={s.contentModal}
      closeButtonClass={s.modalCloseButton}
      title={t.post.edit.title}
    >
      <Slider {...settings} className={s.container}>
        {post.images.map((image: ImageType, idx: number) => {
          if (!(idx % 2)) {
            return (
              <div key={image.uploadId} className={s.carousel}>
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
              counter={MAX_CHARS_POST}
              control={control}
              classNameTextArea={s.textArea}
              name="description"
              label={t.post.edit.addDescription}
            />
            <div className={s.counter}></div>
          </div>
        </form>
        <Button form={id} variant="primary" className={s.submitButton}>
          {t.post.edit.saveChanges}
        </Button>
      </div>
    </Modal>
  )
}
