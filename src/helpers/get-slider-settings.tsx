import { SampleNextArrow } from '@/components/posts/create/cropped-image/sample-next-arrow'
import { SamplePrevArrow } from '@/components/posts/create/cropped-image/sample-prev-arrow'

export const getSliderSettings = (value = 'slick-thumb') => {
  return {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: `slick-dots ${value}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
}
