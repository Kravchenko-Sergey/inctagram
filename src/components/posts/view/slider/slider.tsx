import RadixSlider from 'react-slick'
import Image from 'next/image'

import { getSliderSettings } from '@/helpers'
import { Post, PostImageType } from '@/services/posts'

import s from './slider.module.scss'
import { sortImagesByWidth } from '@/helpers/filterImages'

export const Slider = ({ post }: { post: Post }): JSX.Element => {
  const settings = getSliderSettings(s.dots)
  const newArr = sortImagesByWidth(post.images).reverse()

  return (
    <RadixSlider {...settings} className={s.sliderContainer}>
      {newArr.map((image: PostImageType, idx: number) => {
        if (!(idx % 2)) {
          return (
            <div key={image.uploadId} className={s.carousel}>
              <Image alt="img" src={image.url} width={490} height={562} />
            </div>
          )
        }
      })}
    </RadixSlider>
  )
}
