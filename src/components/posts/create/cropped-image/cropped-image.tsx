import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Slider from 'react-slick'
import getCroppedImg from './Crop'
import { getSliderSettings } from '@/helpers'
import { CropArgType, EasyCrop } from './easy-crop'
import { Add, Crop, Zoom } from '@/components/posts/create/edit-photo'
import { useTranslation } from '@/hooks'

type ImageType = {
  id: number
  img: string
  zoom: number
  filter: string
  aspect: number
}

import s from './croped-image.module.scss'
import {useAppDispatch} from "@/services";
import {setAspect, setCrop, setZoom} from "@/components/posts/create/create-post-slice";

type PropsType = {
  // image: string | null
  // setImage: (image: string | null) => void
  addedImages: ImageType[]
  // setAddedImages: (addedImages: ImageType[]) => void
}

export const CroppedImage = ({ addedImages }: PropsType) => {
  const [index, setIndex] = useState<number>(0)
  // const [zoomValue, setZoomValue] = useState(1)
  // const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  // const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null)
  const { t } = useTranslation()


  const showCroppedImg = async (image: string, croppedAreaPixels: CropArgType | null) => {
    if (croppedAreaPixels && image) {
      try {
        {
          const croppedImage = await getCroppedImg(image, croppedAreaPixels)

          // setCroppedImage(croppedImage as string)

          // @ts-ignore
          addedImages[index] = { image: croppedImage }
          toast.success(t.post.addNewPost.pictureCropped, { icon: false })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
  const settings = getSliderSettings(s.dots)

  const dispatch = useAppDispatch()
  const onChangeZoom = (id:number,zoom:number) =>{
    dispatch(setZoom({zoom,id}))
  }

  const onCropChange = (id:number,crop:CropArgType)=>{
    dispatch(setCrop({id,crop}))
  }

  const onChangeAspect = (id:number,aspect:number)=>{
    dispatch(setAspect({id,aspect}))
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          <Slider {...settings}>
            {addedImages.map((el, idx) => {
              return (
                <div key={idx} className={s.carousel} onClick={() => setIndex(idx)}>
                  <EasyCrop
                    image={el.img}
                    id={el.id}
                    objectFit={'fill'}
                    zoom={el.zoom}
                    setZoom={onChangeZoom}
                    onCropChange={onCropChange}
                    aspectRatio={el.aspect}
                    croppedAreaPixels={croppedAreaPixels}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                  />
                  <div className={s.editAndAdd}>
                    <div className={s.edit}>
                      <Crop className={s.expand}
                            setAspectRatio={onChangeAspect}
                            id={el.id}
                      />
                      <Zoom className={s.maximize}
                            zoom={el.zoom}
                            setZoom={onChangeZoom}
                            imgId={el.id}

                      />
                    </div>
                    <div>
                      <Add
                        image={el.img}
                        addedImages={addedImages}
                      />
                    </div>
                  </div>
                  {/*<button*/}
                  {/*  onClick={() => showCroppedImg(el.image, croppedAreaPixels)}*/}
                  {/*  color="primary"*/}
                  {/*  className={s.button}*/}
                  {/*>*/}
                  {/*  {t.post.addNewPost.showResult}*/}
                  {/*</button>*/}
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </>
  )
}
