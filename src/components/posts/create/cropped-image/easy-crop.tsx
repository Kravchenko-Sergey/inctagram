import ReactCrop, { Point } from 'react-easy-crop'
import { useState } from 'react'

type PropsType = {
  image: string
  id: number
  zoom: number
  aspectRatio: number
  objectFit?: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover' | 'fill'
  onCropChange: (id: number, crop: CropArgType) => void
  setZoom: (id: number, zoom: number) => void
}

export type CropArgType = {
  height: number
  width: number
  x: number
  y: number
}

export const EasyCrop = ({ zoom, onCropChange, aspectRatio, image, setZoom, id }: PropsType) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })

  const onCropComplete = (croppedArea: CropArgType, croppedAreaPixels: CropArgType) => {
    onCropChange(id, croppedAreaPixels)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(id, zoom)
  }

  return (
    <ReactCrop
      image={image}
      objectFit="cover" //zoom and crop doesn't work correctly without it
      crop={crop}
      zoom={zoom}
      zoomWithScroll={true}
      showGrid={false}
      aspect={aspectRatio}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={onZoomChange}
    />
  )
}
