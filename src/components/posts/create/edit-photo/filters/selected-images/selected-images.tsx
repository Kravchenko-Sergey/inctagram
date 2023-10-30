import Slider from 'react-slick'
import Image from 'next/image'

import airBalloon from '/public/image/air-balloon.jpg'
import { Typography } from '@/components'
import { ImageType } from '@/components/posts/create'
import { filters } from '@/components/posts/create/edit-photo'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './selected-images.module.scss'
import { SampleNextArrow } from '@/components/posts/create/cropped-image/sample-next-arrow'
import { SamplePrevArrow } from '@/components/posts/create/cropped-image/sample-prev-arrow'

type PropsType = {
  addedImages: ImageType[]
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  image?: string | null
  setAddedImages?: (addedImages: ImageType[]) => void
}

export const SelectedImages = ({ addedImages, activeFilter, setActiveFilter }: PropsType) => {
  const settings = {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  const onActiveFilter = (filter: string) => {
    switch (filter) {
      case 'No filter':
        setActiveFilter('none')
        break
      case 'Kyoto':
        setActiveFilter('saturate(2)')
        break
      case 'Lark':
        setActiveFilter('grayscale(100%)')
        break
      case 'Gingham':
        setActiveFilter('contrast(160%)')
        break
      case 'Happy':
        setActiveFilter('contrast(110%) brightness(110%) saturate(130%)')
        break
      case 'Clarendon':
        setActiveFilter('invert(100%)')
        break
      case 'Shabby':
        setActiveFilter('sepia(100%)')
        break
      case 'Old school': {
        setActiveFilter('opacity(50%)')
        break
      }
      case 'Silent Hill': {
        setActiveFilter('hue-rotate(180deg)')
        break
      }
      default: {
        setActiveFilter('')
        break
      }
    }
  }

  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...settings}>
          {addedImages.map((el: ImageType, idx: number) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image
                  alt="img"
                  style={{ filter: activeFilter }}
                  src={el.image}
                  width={490}
                  height={503}
                />
              </div>
            )
          })}
        </Slider>
      </div>
      <div className={s.filterContainer}>
        {filters.map((el, idx) => {
          return (
            <div key={idx} className={s.imgWithFilter} onClick={() => onActiveFilter(el.name)}>
              <Image
                src={airBalloon}
                alt="image-with-filter"
                width={108}
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
    </>
  )
}
