import { useEffect } from 'react'

import Image from 'next/image'

import { CloseModal } from '@/assets/icons'


import s from './added-images.module.scss'
import {ImageType} from "@/components/posts/create/create-post-slice";
import {useAppDispatch} from "@/services";

type PropsType = {
  addedImages: ImageType[]
  //setAddedImages: (addedImages: ImageType[]) => void
  image: string | null
  //croppedImage: string | null
}

export const AddedImages = ({ addedImages}: PropsType) => {
  const imagesToShow = addedImages.slice(-2)

  // useEffect(() => {
  //   setAddedImages(addedImages)
  // }, [addedImages, setAddedImages])

  const dispatch = useAppDispatch()
  const onDeleteImage = (i: number) => {
    const image = i === 0 ? imagesToShow.slice(1) : imagesToShow.slice(0, -1)

    //setAddedImages(addedImages.slice(0, -2).concat(image))
  }

  return (
    <div className={addedImages.length === 10 ? s.wrapperForImg : s.wrapper}>
      {addedImages.length <= 1
        ? addedImages.map((el, idx) => {
            return (
              <div key={idx} className={s.addedPhoto}>
                <Image className={s.oneImage} src={el.img} alt="photos" height={82} width={80} />
              </div>
            )
          })
        : imagesToShow.map((el, i) => {
            return (
              <div key={i} className={s.addedPhoto}>
                <div className={s.closeIcon} onClick={() => onDeleteImage(i)}>
                  <CloseModal className={s.close} />
                </div>
                <Image className={s.image} src={el.img} alt="photos" height={82} width={80} />
              </div>
            )
          })}
    </div>
  )
}
