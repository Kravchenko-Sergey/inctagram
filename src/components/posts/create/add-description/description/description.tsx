import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { MAX_CHARS_POST } from '@/consts/input-limits'
import { useTranslation } from '@/hooks'
import { ControlledTextArea } from '@/components'
import { DescriptionFormType, descriptionSchema } from '@/schemas'
import { FormFields, getBinaryImageData, triggerZodFieldError } from '@/helpers'
import {
  CreatePostRequest,
  useCreatePostCommentsMutation,
  useCreatePostPhotoMutation,
} from '@/services/posts'
import s from './description.module.scss'
import { useMeQuery } from '@/services/auth'
import { ImageType } from '@/components/posts/create/create-post-slice'
import { getFilteredImg } from '@/components/posts/create/edit-photo'

type DescriptionFormTypeProps = {
  addedImages: ImageType[]
}

export const PostDescription = ({ addedImages }: DescriptionFormTypeProps) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [createPostComment, { isLoading: isPostCreateLoading }] = useCreatePostCommentsMutation()
  const [createPostPhoto, { isLoading: isPostPhotoLoading }] = useCreatePostPhotoMutation()
  const { data: me } = useMeQuery()
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

  const saveFilteredImage = async (images: ImageType[]): Promise<ImageType[]> => {
    try {
      const updatedImages = await Promise.all(
        images.map(async el => {
          const filteredImage = await getFilteredImg(el.img, el.filter)

          return {
            img: filteredImage as string,
          }
        })
      )

      return updatedImages as ImageType[]
    } catch (e) {
      console.error(e)
      return []
    }
  }

  const onSubmit = async (data: DescriptionFormType) => {
    const imgWithFilter = await saveFilteredImage(addedImages)
    const res = await getBinaryImageData(imgWithFilter)

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
        const requestBody: CreatePostRequest = {
          description: data.description,
          childrenMetadata: imageId ? imageId : ({} as [{ uploadId: string }]),
        }

        if (responsePhotoStore.images) {
          await createPostComment(requestBody)
        }
      } catch (e: unknown) {
        const error = e as any

        console.error(error)
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
    </div>
  )
}
