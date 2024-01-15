import { useEffect, useState } from 'react'
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
import s from './description.module.scss'
import { useMeQuery } from '@/services/auth'
import { ImageType, resetState } from '@/components/posts/create/create-post-slice'
import { useAppDispatch } from '@/services'
import { PATH } from '@/consts/route-paths'
import { database } from '@/components/posts/create/database.config'
import { saveFilteredImage } from '@/components/posts/create/DTO/save-filtered-images'
import { createFormData } from '@/components/posts/create/DTO/create-form-data'

type DescriptionFormTypeProps = {
  addedImages: ImageType[]
}

export const PostDescription = ({ addedImages }: DescriptionFormTypeProps) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const [createPostComment] = useCreatePostCommentsMutation()
  const [createPostPhoto] = useCreatePostPhotoMutation()
  const [loading, setLoading] = useState(false)
  const userId = useMeQuery().data?.userId
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
    setLoading(true)
    const imgWithFilter = await saveFilteredImage(addedImages)
    const binaryImageData = await getBinaryImageData(imgWithFilter)

    const formattedToFormData = createFormData(binaryImageData)

    if (addedImages.length) {
      try {
        const responsePhotoStore = await createPostPhoto(formattedToFormData).unwrap()

        const imageId = responsePhotoStore.images.map(item => ({ uploadId: item.uploadId }))
        const requestBody: CreatePostRequest = {
          description: data.description,
          childrenMetadata: imageId ? imageId : ({} as [{ uploadId: string }]),
        }

        if (responsePhotoStore.images) {
          await createPostComment(requestBody)
        }

        await database.delete()

        dispatch(resetState())
        await push(`${PATH.PROFILE}?id=${userId}`)
      } catch (e: unknown) {
        const error = e as any

        console.error(error)
      } finally {
        setLoading(false)
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
        <button className={s.submitButton}>Publish</button>
      </form>
      {loading && <Loader className={s.loader} />}
    </div>
  )
}
