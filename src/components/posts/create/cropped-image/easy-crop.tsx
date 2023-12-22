import {Area} from 'react-easy-crop'
import {useAppDispatch} from "@/services";
import {setCropValue} from "@/components/posts/create/create-post-slice";

import Cropper from "react-easy-crop";

import {useState} from "react";

type PropsType = {
  image: string
  id:string | undefined
  zoom: number
  aspectRatio: number
  setZoom: (zoom: number,imgId:string) => void
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
  image,
  setZoom,
  id
}: PropsType) => {

  const dispatch = useAppDispatch()

  const [crop, setCrop] = useState({ x: 0, y: 0 })

  const onCropComplete =  (croppedArea: Area , croppedAreaPixels: Area) => {
    if(image && id){
      dispatch(setCropValue({cropArgs: {...croppedAreaPixels},image,id}))
    }
  }
  const onZoomChange = (zoom:number)=> id && setZoom(zoom,id)


  return (
    <Cropper
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
