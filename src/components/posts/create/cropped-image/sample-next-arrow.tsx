import { memo } from 'react'
import { CustomArrowProps } from 'react-slick'

export const SampleNextArrow = memo((props: CustomArrowProps) => {
  const { className, style, onClick } = props

  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: 15 }}
      onClick={onClick}
    />
  )
})
