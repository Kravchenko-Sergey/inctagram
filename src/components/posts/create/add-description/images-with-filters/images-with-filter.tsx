import Slider from 'react-slick'
import Image from 'next/image'

import { ImageType } from '@/components/posts/create/create-post-modal'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './images-with-filters.module.scss'

type PropsType = {
  addedImages: ImageType[]
  activeFilter: string
}

export const FilteredImages = ({ addedImages, activeFilter }: PropsType) => {
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

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: 15 }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{ ...style, display: 'block', left: 15, zIndex: 1 }}
        onClick={onClick}
      />
    )
  }

  return (
    <>
      <div className={s.imgContainer}>
        <Slider {...settings}>
          {addedImages.map((el: any, idx: any) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image
                  alt="img"
                  src={el.image}
                  width={490}
                  height={503}
                  style={{ filter: activeFilter }}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}
