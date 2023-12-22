import Slider from 'react-slick'
import Image from 'next/image'
import { ImageType } from '@/components/posts/create/create-post-modal'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './images-with-filters.module.scss'
import { getSliderSettings } from '@/helpers'


type PropsType = {
  addedImages: ImageType[]

}

export const FilteredImages = ({addedImages}:PropsType) => {
  const settings = getSliderSettings()
    const customStyles = `
       .slick-dots {
                     position: absolute;
                     bottom: 20px;
                     left:12px;
                    }
             `;

  return (

      <div className={s.imgContainer}>
          <Slider {...settings}  >
              {addedImages.map((el: ImageType, idx: number) => {
                  return (
                      <div key={idx} >
                          <Image
                              alt="img"
                              style={{
                                  filter:el.filter,
                                  zoom:el.zoom,
                                  objectFit:'cover'
                                }}
                              src={el.image}
                              width={500}
                              height={510}
                          />
                          <style>{customStyles}</style>
                      </div>
                  )
              })}
          </Slider>
      </div>


  )
}
