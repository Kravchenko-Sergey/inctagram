import React, { Dispatch, SetStateAction, useState } from 'react'
import Cropper from 'react-easy-crop'
import { CropArgType, ImageType } from '@/components/posts/add-post/add-post'
import s from './crop-image-components.module.scss'
import getCroppedImg from '@/components/posts/add-post/crop-image-components/crop'
import { Button } from '@/components'

type CropImageComponentProps = {
  addedImages: ImageType[]
  // onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void
  setCroppedImage: Dispatch<SetStateAction<string>>
}

export const CropImageComponent = ({ addedImages, setCroppedImage }: CropImageComponentProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null)

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(addedImages[0]?.image, croppedAreaPixels, rotation)

        // console.log('donee', { croppedImage })
        if (croppedImage) {
          setCroppedImage(croppedImage) // посмотреть почему может быть налл
        }
      } catch (e) {
        console.error(e)
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
    <div className={s.cropContainer}>
      <Cropper
        style={cropperStyle}
        image={addedImages[0]?.image}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        onRotationChange={setRotation}
        aspect={5.7 / 6}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        showGrid={false}
        objectFit="cover"
      />
      {!!addedImages.length && (
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
      )}
      <div>
        <Button
          style={{ position: 'relative', zIndex: 1000 }}
          onClick={showCroppedImage}
          variant="primary"
        >
          Show Result
        </Button>
      </div>
    </div>
  )
}
