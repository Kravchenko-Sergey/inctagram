import React from 'react'
import s from './filters.module.scss'
import { ImageType } from '@/components/posts/add-post/add-post'
import Image from 'next/image'

type FilterProps = {
  addedImages: ImageType[]
}

export const Filters = ({ addedImages }: FilterProps) => {
  return (
    <div className={s.container}>
      {addedImages.map(item => (
        <Image src={item.image} width={100} height={100} alt="" />
      ))}
    </div>
  )
}
