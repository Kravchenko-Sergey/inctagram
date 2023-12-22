import Slider from 'react-slick'
import Image from 'next/image'

import airBalloon from '/public/image/air-balloon.jpg'
import { Typography } from '@/components'
import { ImageType } from '@/components/posts/create'
import { filters } from '@/components/posts/create/edit-photo'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './selected-images.module.scss'
import { getSliderSettings } from '@/helpers'
import {str} from "@storybook/docs-tools";
import {useState} from "react";

type PropsType = {
  addedImages: ImageType[]
  filteredImage:(filter:string,id:string)=>void
}

export const SelectedImages = ({ addedImages,filteredImage }: PropsType) => {
  const settings = getSliderSettings(s.dots)
  const [imageId,setImageId ] = useState('0')
  const onActiveFilter = (filter: string) => {
    switch (filter) {
      case 'No filter':
        filteredImage('none',imageId)
        break
      case 'Kyoto':
        filteredImage('saturate(2)',imageId)
        break
      case 'Lark':
        filteredImage('grayscale(100%)',imageId)
        break
      case 'Gingham':
        filteredImage('contrast(160%)',imageId)
        break
      case 'Happy':
        filteredImage('contrast(110%) brightness(110%) saturate(130%)',imageId)
        break
      case 'Clarendon':
        filteredImage('invert(100%)',imageId)
        break
      case 'Shabby':
        filteredImage('sepia(100%)',imageId)
        break
      case 'Old school': {
        filteredImage('opacity(50%)',imageId)
        break
      }
      case 'Silent Hill': {
        filteredImage('hue-rotate(180deg)',imageId)
        break
      }
      default: {
        filteredImage('',imageId)
        break
      }
    }
  }

  const currentSlide = (currentSlide:number)=> setImageId(currentSlide.toString())

  return (
    <div className={s.FilterContainer}>
      <div className={s.imgContainer}>
        <Slider {...settings} afterChange={currentSlide}>
          {addedImages.map((el: ImageType, idx: number) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image
                  className={s.img}
                  alt="img"
                  style={{ filter:el.filter,zoom:el.zoom,objectFit:'cover'}}
                  src={el.image}
                  width={500}
                  height={510}
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
    </div>
  )
}
