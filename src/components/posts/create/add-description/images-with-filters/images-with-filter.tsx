import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './images-with-filters.module.scss'
import { getSliderSettings } from '@/helpers'
import { ImageType } from '@/components/posts/create/create-post-slice'

type PropsType = {
  addedImages: ImageType[]
}

export const FilteredImages = ({ addedImages }: PropsType) => {
  const settings = getSliderSettings()
  const customStyles = `
    .slick-dots{
    position:absolute;
    bottom:20px;
    left:12px;
    }
  `

  return (
    <>
      <div className={s.imgContainer}>
        <Slider className={s.slider} {...settings}>
          {addedImages.map((el: ImageType, idx: number) => {
            return (
              <div key={idx} className={s.carousel}>
                <Image
                  alt="img"
                  // objectFit={'cover'}
                  // layout={'fill'}
                  src={el.img}
                  priority
                  width={493}
                  height={564}
                  style={{ filter: el.filter, objectFit: 'cover' }}
                />
                <style>{customStyles}</style>
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}
