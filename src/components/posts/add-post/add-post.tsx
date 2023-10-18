import React, { ChangeEvent, useRef, useState } from 'react'
import { Button, Modal } from '@/components'
import { ImageOutline } from '@/assets/icons'
import { useTranslation } from '@/hooks'
import Image from 'next/image'
import Cropper from 'react-easy-crop'

import s from './add-post.module.scss'
import { ImageType } from '@/pages/create/test/create-new-post/create-new-post'
import { CroppedImage } from '@/pages/create/test/cropped-image'

export const AddPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [uploadError, setUploadError] = useState<string>('')
  const [avatarEditMode, setAvatarEditMode] = useState(false)
  const [imageURL, setImageURL] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const permittedFileTypes = ['jpg', 'jpeg', 'png']
  const permittedFileSize = 10485760 // 10Mb in bytes
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [image, setImage] = useState<string | null>(null)
  const [addedImages, setAddedImages] = useState<ImageType[]>([])

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {}
  const { t } = useTranslation()

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadInput = e.target

    if (uploadInput instanceof HTMLInputElement && uploadInput.files && uploadInput.files.length) {
      const file = uploadInput.files[0]

      if (!file) return setUploadError(t.errors.imageUploadError)
      const fileName = file.name.toLowerCase()

      const matches = [...permittedFileTypes].some(it => {
        return fileName.endsWith(it)
      })

      if (matches && file.size <= permittedFileSize) {
        setUploadError('')
        let previewPhoto = function (reader: any) {
          // setImageURL(reader.result)

          setAddedImages([
            {
              id: (addedImages.length + 1).toString(),
              // image: URL.createObjectURL(reader.result),
              image: reader.result,
            },
          ])
          setAvatarEditMode(true)
        }

        let reader = new FileReader()

        reader.addEventListener('load', previewPhoto.bind(this, reader))
        reader.readAsDataURL(file)
        // setImageURL(file)
      } else if (!matches) {
        setUploadError(t.errors.imageFormatError)
      } else {
        setUploadError(t.errors.imageSizeError)
      }
    }
  }
  const cropperStyle = {
    cropAreaStyle: {
      boxShadow: 'none',
      border: 'none',
    },
  }

  return (
    <div>
      <div className={s.cropContainer}>
        <CroppedImage
          image={
            'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
          }
          setImage={setImage}
          addedImages={addedImages}
          setAddedImages={setAddedImages}
        />

        <Cropper
          style={cropperStyle}
          // image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          image={addedImages[0]?.image}
          crop={crop}
          zoom={zoom}
          aspect={5.7 / 6}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={false}
          objectFit="cover"
        />

        <div className={s.controls}>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={e => {
              setZoom(+e.target.value)
            }}
            className={s.zoomRange}
          />
        </div>
      </div>
      {!addedImages.length && (
        <Modal
          isOpen={isModalOpen}
          title={'Add Photo'}
          className={s.modalContainer}
          onOpenChange={() => setIsModalOpen(false)}
          contentClassName={s.modalContent}
        >
          <div className={s.imageContainer}>
            <ImageOutline />
            {uploadError && <div className={s.uploadError}>{uploadError}</div>}
          </div>
          <Button variant={'primary'} onClick={() => inputRef && inputRef.current?.click()}>
            Select from Computer
          </Button>
          <input ref={inputRef} type="file" onChange={uploadHandler} style={{ display: 'none' }} />
          {/*  </>*/}
          <Button variant={'ghost'} className={s.btnFooter} onClick={() => {}}>
            Open Draft
          </Button>
          {/*)}*/}
        </Modal>
      )}
    </div>
  )
}
