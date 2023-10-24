import React, { useRef, useState } from 'react'

import s from './create-post-modal.module.scss'

// import CreateIcon from '@/src/assets/icons/create-icon'
// eslint-disable-next-line import/namespace,import/default
// import { LinkMenu } from '@/src/components/profile/links'

import { useTranslation } from '@/hooks'
import { Button, Typography } from '@/components'
import { ImageOutline } from '@/assets/icons'
import { BaseModal } from '@/components/posts/create/base-modal/base-modal'
import { CropModal } from '@/components/posts/create/crop-modal/crop-modal'
import { CroppedImage } from '@/components/posts/create/cropped-image/cropped-image'

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
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
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
          modalWidth={'md'}
          open={isBaseModalOpen}
          onClose={handleButtonClick}
          title="Add Photo"
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImageOutline />
          </div>
          <div>
            <Button variant={'primary'} onClick={selectFileHandler} className={s.btn}>
              <Typography variant={'h3'}>Select from Computer</Typography>
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
          title={'Crop Image'}
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
      {/*<LinkMenu*/}
      {/*  nameLink="Create Post"*/}
      {/*  link={'my-profile'}*/}
      {/*  handleClick={handleClick}*/}
      {/*  variantIcon={variantIcon}*/}
      {/*>*/}
      {/*  <CreateIcon color={variantIcon === 'create' ? '#397df6' : 'white'} />*/}
      {/*</LinkMenu>*/}
    </div>
  )
}
