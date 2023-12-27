import Slider from 'react-slick'
import Image from 'next/image'

import { ImageType } from '@/components/posts/create/create-post-modal'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './images-with-filters.module.scss'
import { getSliderSettings } from '@/helpers'

type PropsType = {
  addedImages: ImageType[]
  activeFilter: string
}

export const FilteredImages = ({ addedImages, activeFilter }: PropsType) => {
  const settings = getSliderSettings()

  return (
    <>
      <div className={s.imgContainer}>
        {/*<Slider {...settings}>*/}
        {/*  {addedImages.map((el: ImageType, idx: number) => {*/}
        {/*    return (*/}
        {/*      <div key={idx} className={s.carousel}>*/}
        {/*        <Image*/}
        {/*          alt="img"*/}
        {/*          // objectFit={'cover'}*/}
        {/*          // layout={'fill'}*/}
        {/*          src={el.image}*/}
        {/*          priority*/}
        {/*          width={490}*/}
        {/*          height={503}*/}
        {/*          style={{ filter: activeFilter, objectFit: 'cover' }}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    )*/}
        {/*  })}*/}
        {/*</Slider>*/}
      </div>
    </>
  )
}
