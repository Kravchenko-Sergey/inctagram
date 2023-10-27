import { useRef, useState } from 'react'

import { useTranslation } from '@/hooks'
import { Button, Typography } from '@/components'
import { ImageOutline } from '@/assets/icons'
import { CropModal } from './crop-modal'
import { CroppedImage } from './cropped-image'
import { BaseModal } from './base-modal'

import s from './create-post-modal.module.scss'

export type ImageType = {
  image: string
  id?: string
  croppedImage?: string
}

export const CreatePostModal = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [addedImages, setAddedImages] = useState<ImageType[]>([])

  const handleButtonClick = () => {
    setIsBaseModalOpen(false)
    setImage(null)
    setIsModalOpen(false)
  }
  const cancelButtonClick = () => {
    setIsBaseModalOpen(false)
    setIsModalOpen(false)
  }

  const handleImageUpload = async (e: any) => {
    // setImage(URL.createObjectURL(e.target.files[0]))
    setAddedImages([
      {
        id: (addedImages.length + 1).toString(),
        image: URL.createObjectURL(e.target.files[0]),
      },
    ])
    setIsBaseModalOpen(false)
    setIsModalOpen(true)
  }

  const handleClick = () => {
    setIsBaseModalOpen(true)
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <div className={s.container}>
      {!addedImages.length && isBaseModalOpen ? (
        <BaseModal
          modalWidth="md"
          open={isBaseModalOpen}
          onClose={handleButtonClick}
          title={t.addNewPost.addPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImageOutline />
          </div>
          <div>
            <Button variant="primary" onClick={selectFileHandler} className={s.btn}>
              <Typography variant="h3">{t.profile.selectImage}</Typography>
            </Button>
            <input
              type="file"
              ref={inputRef}
              name="cover"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
            />
          </div>
        </BaseModal>
      ) : (
        <CropModal
          image={image}
          open={isModalOpen}
          onClose={handleButtonClick}
          onCancel={cancelButtonClick}
          title={t.addNewPost.cropping}
          addedImages={addedImages}
          setAddedImages={setAddedImages}
          isBaseModalOpen={isBaseModalOpen}
          setIsBaseModalOpen={setIsBaseModalOpen}
          setImage={setImage}
        >
          <CroppedImage
            image={image}
            setImage={setImage}
            addedImages={addedImages}
            setAddedImages={setAddedImages}
          />
        </CropModal>
      )}
    </div>
  )
}
