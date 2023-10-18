import React, { FC } from 'react'

import ReactCrop from 'react-easy-crop'

type EasyCropPropsType = {
  image?: string
  crop: { x: number; y: number }
  zoom: number
  aspectRatio: number
  objectFit?: string
  setCrop: (crop: { x: number; y: number }) => void
  setZoom: (zoom: number) => void
  croppedAreaPixels: CropArgType | null
  setCroppedAreaPixels: (croppedAreaPixels: CropArgType | null) => void
}

export type CropArgType = {
  height: number
  width: number
  x: number
  y: number
}

export const EasyCrop = ({
  zoom,
  aspectRatio,
  crop,
  image,
  objectFit,
  setZoom,
  setCroppedAreaPixels,
  setCrop,
}: EasyCropPropsType) => {
  const onCropComplete = (croppedArea: CropArgType, croppedAreaPixels: CropArgType) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  return (
    <ReactCrop
      image={image}
      objectFit={'cover'} //zoom and crop doesn't work correctly without it
      crop={crop}
      zoom={zoom}
      zoomWithScroll={true}
      showGrid={false}
      aspect={aspectRatio}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  )
}
