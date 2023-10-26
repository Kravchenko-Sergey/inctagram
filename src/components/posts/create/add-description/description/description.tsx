import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { MAX_CHARS } from '@/consts/input-limits'
import { useTranslation } from '@/hooks'
import { ControlledTextArea } from '@/components'
import { DescriptionFormType, descriptionSchema } from '@/schemas'
import { FormFields, getBinaryImageData, triggerZodFieldError } from '@/helpers'
import {
  CreatePostCommentRequest,
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
} from '@/services/posts'
import { ImageType } from '@/components/posts/create'

import s from './description.module.scss'

type DescriptionFormTypeProps = {
  onSubmitHandler?: (data: DescriptionFormType) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  addedImages: ImageType[]
}

export const PostDescription = ({ addedImages, defaultValue }: DescriptionFormTypeProps) => {
  const { t } = useTranslation()
  const [createPostComment] = useCreatePostCommentsMutation()
  const [createPostPhoto] = useCreatePostPhotoMutation()

  const {
    control,
    handleSubmit,

    trigger,

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

      res.forEach(binaryData => {
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
      } catch (e: unknown) {
        const error = e as any
      }
    }
  }

  return (
    <div className={s.wrap}>
      <form id="form1" method="get" className={s.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.mainContent}>
          <ControlledTextArea
            counter={MAX_CHARS}
            control={control}
            classNameTextArea={s.textArea}
            name="description"
            label={t.addNewPost.addDescription}
          />
          <div className={s.counter}></div>
        </div>
      </form>
    </div>
  )
}
