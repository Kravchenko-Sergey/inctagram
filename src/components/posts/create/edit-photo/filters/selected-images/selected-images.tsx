import Slider from 'react-slick'
import Image from 'next/image'

import airBalloon from '/public/image/air-balloon.jpg'
import { Typography } from '@/components'

import { filtersData } from '@/components/posts/create/edit-photo'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './selected-images.module.scss'
import { getSliderSettings } from '@/helpers'
import { ImageType } from '@/components/posts/create/create-post-slice'
import { useState } from 'react'

type PropsType = {
  addedImages: ImageType[]
  onChangeFilter: (filter: string, id: number) => void
}

export const SelectedImages = ({ addedImages, onChangeFilter }: PropsType) => {
  const settings = getSliderSettings(s.dots)
  const [currentSlideId, setCurrentSlideId] = useState(0)

  const onActiveFilter = (filter: string) => {
    switch (filter) {
      case 'No filter':
        onChangeFilter('none', currentSlideId)
        break
      case 'Kyoto':
        onChangeFilter('saturate(2)', currentSlideId)
        break
      case 'Lark':
        onChangeFilter('grayscale(100%)', currentSlideId)
        break
      case 'Gingham':
        onChangeFilter('contrast(160%)', currentSlideId)
        break
      case 'Happy':
        onChangeFilter('contrast(110%) brightness(110%) saturate(130%)', currentSlideId)
        break
      case 'Clarendon':
        onChangeFilter('invert(100%)', currentSlideId)
        break
      case 'Shabby':
        onChangeFilter('sepia(100%)', currentSlideId)
        break
      case 'Old school': {
        onChangeFilter('opacity(50%)', currentSlideId)
        break
      }
      case 'Silent Hill': {
        onChangeFilter('hue-rotate(180deg)', currentSlideId)
        break
      }
      default: {
        onChangeFilter('none', currentSlideId)
        break
      }
    }
  }

  const onSlideChange = (_: number, currentSlide: number) => {
    setCurrentSlideId(currentSlide)
  }

  return (
    <div className={s.filterPageContainer}>
      <div className={s.imgContainer}>
        <Slider className={s.slider} {...settings} beforeChange={onSlideChange}>
          {addedImages.map((el: ImageType, idx: number) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image
                  className={s.img}
                  alt="img"
                  style={{ filter: el.filter }}
                  src={el.img}
                  width={493}
                  height={564}
                />
              </div>
            )
          })}
        </Slider>
      </div>
      <div className={s.filterContainer}>
        {filtersData.map((el, idx) => {
          return (
            <div key={idx} className={s.imgWithFilter} onClick={() => onActiveFilter(el.name)}>
              <Image
                src={airBalloon}
                alt="image-with-filter"
                width={130}
                height={108}
                style={{ filter: el.filter }}
                className={s.image}
              />
              <div className={s.filterName}>
                <Typography variant="h3">{el.name}</Typography>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
