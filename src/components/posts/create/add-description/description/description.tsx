import React, { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './description.module.scss'

import { useTranslation } from '@/hooks'
import { ControlledTextArea, Typography } from '@/components'
import { Avatar } from '@/components/ui/avatar'
import { DescriptionFormType, descriptionSchema } from '@/schemas/description-schema'
import { FormFields, getBinaryImageData, triggerZodFieldError } from '@/helpers'
import { useMeQuery } from '@/services/auth'
import { useGetProfileQuery } from '@/services/profile'
import { ImageType } from '@/components/posts/create/create-post-modal'
import {
  CreatePostCommentRequest,
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
} from '@/services/posts'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'

type DescriptionFormTypeProps = {
  onSubmitHandler?: (data: DescriptionFormType) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  addedImages: ImageType[]
}

export const PostDescription = ({
  onSubmitHandler,
  addedImages,
  defaultValue,
}: DescriptionFormTypeProps) => {
  const { t } = useTranslation()
  const { data: me } = useMeQuery()
  const { data: profile, isLoading, isFetching } = useGetProfileQuery({ profileId: me?.userId })
  const [createPostComment, {}] = useCreatePostCommentsMutation()
  const [createPostPhoto, { data: photoData }] = useCreatePostPhotoMutation()
  const { push } = useRouter()
  const {
    control,
    handleSubmit,
    formState,
    trigger,
    getValues,
    formState: { touchedFields },
  } = useForm<DescriptionFormType>({
    resolver: zodResolver(descriptionSchema(t)),
    mode: 'onChange',
    defaultValues: {
      description: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  const onSubmit = async (data: DescriptionFormType) => {
    const res = await getBinaryImageData(addedImages)

    function createFormData(res: Uint8Array[]) {
      const formData = new FormData()

      res.forEach((binaryData, index) => {
        const blob = new Blob([binaryData], { type: 'image/jpeg' })

        formData.append(`file`, blob)
      })

      return formData
    }

    const formData = createFormData(res)

    if (addedImages.length) {
      try {
        const responsePhotoStore = await createPostPhoto(formData).unwrap()

        const imageId = responsePhotoStore.images.map(item => ({ uploadId: item.uploadId }))
        const requestBody: CreatePostCommentRequest = {
          description: data.description,
          childrenMetadata: imageId ? imageId : ({} as [{ uploadId: string }]),
        }

        if (responsePhotoStore.images) {
          await createPostComment(requestBody)
        }
        push(PATH.PROFILE)
      } catch (e: unknown) {
        const error = e as any
      }
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.userInfo}>
        <div>
          <Avatar photo={profile?.avatars[0].url} size={36} className={s.ava} />
        </div>
        <div className={s.userName}>
          <Typography variant={'h3'} color="primary">
            User Name
          </Typography>
        </div>
      </div>
      <form id={'form1'} method={'get'} className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.mainContent}>
          <ControlledTextArea
            control={control}
            classNameTextArea={s.textArea}
            name={'description'}
            label={'Add Description'}
          />
          <div className={s.counter}>
            <Typography variant={'small_text'} color="secondary">
              {getValues('description').length}/500
            </Typography>
          </div>
        </div>
      </form>
    </div>
  )
}
