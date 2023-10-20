import React, { useEffect, useState } from 'react'
// import { CroppedImage } from '@/components/posts/add-post/test/cropped-image'
import { CropImageComponent } from '@/components/posts/add-post/crop-image-components/crop-image-component'
import { AddFile } from '@/components/posts/file-modal/add-file'
import { Filters } from '@/components/posts/add-post/filters/filters'
import { Publication } from '@/components/posts/add-post/publication/publication'

import s from './add-post.module.scss'
import { ModalPost } from '@/components/posts/add-post/modal-post/modal-post'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { publicationSchema, PublicationSchemaSchemaType } from '@/schemas/publication-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/hooks'

export type ImageType = {
  image: string
  id?: string
  croppedImage?: string
}
export type CropArgType = {
  height: number
  width: number
  x: number
  y: number
}

export type ModalType = 'Add Photo' | 'Cropping' | 'Filters' | 'Publication'

export const AddPost = () => {
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(true)
  const [imageURL, setImageURL] = useState<string>('')
  const [typeModal, setTypeModal] = useState<ModalType>('Add Photo')

  const [addedImages, setAddedImages] = useState<ImageType[]>([])
  const [positionValue, setPositionValue] = useState(0)
  const { t } = useTranslation()

  const backCropModalHandler = () => {
    if (typeModal === 'Publication') {
      setPositionValue(-985)
      setTypeModal('Filters')
    } else if (typeModal === 'Filters') {
      setPositionValue(-495)
      setTypeModal('Cropping')
    } else if (typeModal === 'Cropping') {
      setPositionValue(0)
      setTypeModal('Add Photo')
    }
  }

  const { handleSubmit, control, getValues } = useForm<PublicationSchemaSchemaType>({
    resolver: zodResolver(publicationSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      comment: '',
      location: 'Grodno',
    },
  })

  const transitionHandler = () => {
    if (typeModal === 'Cropping') {
      setPositionValue(-985)
      setTypeModal('Filters')
      addImage()
    } else if (typeModal === 'Filters') {
      setPositionValue(-1970)
      setTypeModal('Publication')
    } else if (typeModal === 'Publication') {
      submitPost()
    }
  }
  const submitPost = () => {}
  const addImage = () => {
    setAddedImages([
      ...addedImages,
      {
        id: (addedImages.length + 1).toString(),
        image: imageURL,
      },
    ])
  }

  return (
    <div className={s.container}>
      <ModalPost
        typeModal={typeModal}
        onBackClick={backCropModalHandler}
        isOpen={isBaseModalOpen}
        onOpenChange={setIsBaseModalOpen}
        transitionHandler={transitionHandler}
      >
        <div style={{ left: positionValue + 'px' }} className={s.itemsContainer}>
          <AddFile
            setTypeModal={setTypeModal}
            setPositionValue={setPositionValue}
            setAddedImages={setAddedImages}
            addedImages={addedImages}
          />
          <CropImageComponent addedImages={addedImages} setCroppedImage={setImageURL} />
          <Filters addedImages={addedImages} />
          <Publication imageUrl={addedImages[0]?.image} />
        </div>
      </ModalPost>
    </div>
  )
}
