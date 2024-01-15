import { memo } from 'react'
import { CustomArrowProps } from 'react-slick'

export const SamplePrevArrow = memo((props: CustomArrowProps) => {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: 15, zIndex: 1 }}
      onClick={onClick}
    />
  )
})
