import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Slider from 'react-slick'

import getCroppedImg from './Crop'

import { getSliderSettings } from '@/helpers'
import { CropArgType, EasyCrop } from './easy-crop'
import { ImageType } from '@/components/posts/create'
import { Add, Crop, Zoom } from '@/components/posts/create/edit-photo'
import { useTranslation } from '@/hooks'

import s from './croped-image.module.scss'

type PropsType = {
  image: string | null
  setImage: (image: string | null) => void
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
}

export const CroppedImage = ({ image, addedImages, setAddedImages }: PropsType) => {
  const [index, setIndex] = useState<number>(0)
  const [zoomValue, setZoomValue] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArgType | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages, setAddedImages])

  const showCroppedImg = async (image: string, croppedAreaPixels: CropArgType | null) => {
    if (croppedAreaPixels && image) {
      try {
        {
          const croppedImage = await getCroppedImg(image, croppedAreaPixels)

          setCroppedImage(croppedImage as string)

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

  return (
    <>
      <div className={s.container}>
        <div className={s.cropContainer}>
          {/*<Slider {...settings}>*/}
          {/*  {addedImages.map((el, idx) => {*/}
          {/*    return (*/}
          {/*      <div key={idx} className={s.carousel} onClick={() => setIndex(idx)}>*/}
          {/*        <EasyCrop*/}
          {/*          image={el.image}*/}
          {/*          objectFit={'fill'}*/}
          {/*          crop={crop}*/}
          {/*          zoom={zoomValue}*/}
          {/*          setZoom={setZoomValue}*/}
          {/*          setCrop={setCrop}*/}
          {/*          aspectRatio={aspectRatio}*/}
          {/*          croppedAreaPixels={croppedAreaPixels}*/}
          {/*          setCroppedAreaPixels={setCroppedAreaPixels}*/}
          {/*        />*/}
          {/*        <div className={s.editAndAdd}>*/}
          {/*          <div className={s.edit}>*/}
          {/*            <Crop className={s.expand} setAspectRatio={setAspectRatio} />*/}
          {/*            <Zoom className={s.maximize} zoom={zoomValue} setZoom={setZoomValue} />*/}
          {/*          </div>*/}
          {/*          <div>*/}
          {/*            <Add*/}
          {/*              image={croppedImage ? croppedImage : image}*/}
          {/*              addedImages={addedImages}*/}
          {/*              setAddedImages={setAddedImages}*/}
          {/*              croppedImage={croppedImage}*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*        <button*/}
          {/*          onClick={() => showCroppedImg(el.image, croppedAreaPixels)}*/}
          {/*          color="primary"*/}
          {/*          className={s.button}*/}
          {/*        >*/}
          {/*          {t.post.addNewPost.showResult}*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*    )*/}
          {/*  })}*/}
          {/*</Slider>*/}
        </div>
      </div>
    </>
  )
}
