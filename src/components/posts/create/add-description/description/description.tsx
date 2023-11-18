import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { MAX_CHARS_POST } from '@/consts/input-limits'
import { useTranslation } from '@/hooks'
import { ControlledTextArea, Loader } from '@/components'
import { DescriptionFormType, descriptionSchema } from '@/schemas'
import { FormFields, getBinaryImageData, triggerZodFieldError } from '@/helpers'
import {
  CreatePostRequest,
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
} from '@/services/posts'
import { PATH } from '@/consts/route-paths'
import { ImageType } from '@/components/posts/create'

import s from './description.module.scss'

type DescriptionFormTypeProps = {
  onSubmitHandler?: (data: DescriptionFormType) => void
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
  addedImages: ImageType[]
  isPostCreateLoadingHandler: (value: boolean) => void

  setIsModalOpen: (isModalOpen: boolean) => void
  setIsFiltersModalOpen: (isFiltersModalOpen: boolean) => void
  setIsDescriptionModalOpen: (value: boolean) => void
}

export const PostDescription = ({
  addedImages,
  setIsFiltersModalOpen,
  setIsModalOpen,
  defaultValue,
  setIsDescriptionModalOpen,
  isPostCreateLoadingHandler,
}: DescriptionFormTypeProps) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [createPostComment, { isLoading: isPostCreateLoading }] = useCreatePostCommentsMutation()
  const [createPostPhoto, { isLoading: isPostPhotoLoading }] = useCreatePostPhotoMutation()

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
    isPostCreateLoadingHandler(true)
    const res = await getBinaryImageData(addedImages)

    function createFormData(res: Uint8Array[]) {
      const formData = new FormData()

      res.forEach(binaryData => {
        const blob = new Blob([binaryData], { type: 'image/jpeg' })

        formData.append(`file`, blob)
      })
      setIsFiltersModalOpen(false)

      setIsModalOpen(false)
      setIsDescriptionModalOpen(false)

      return formData
    }

    const formData = createFormData(res)

    if (addedImages.length) {
      try {
        const responsePhotoStore = await createPostPhoto(formData).unwrap()
        // console.log('responsePhotoStore', responsePhotoStore)

        const imageId = responsePhotoStore.images.map(item => ({ uploadId: item.uploadId }))
        const requestBody: CreatePostRequest = {
          description: data.description,
          childrenMetadata: imageId ? imageId : ({} as [{ uploadId: string }]),
        }

        if (responsePhotoStore.images) {
          await createPostComment(requestBody)
        }
        isPostCreateLoadingHandler(false)
        push(PATH.PROFILE)
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
            counter={MAX_CHARS_POST}
            control={control}
            classNameTextArea={s.textArea}
            name="description"
            label={t.post.addNewPost.addDescription}
          />
          <div className={s.counter}></div>
        </div>
      </form>
    </div>
  )
}
