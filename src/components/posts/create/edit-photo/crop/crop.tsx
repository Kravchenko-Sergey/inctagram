import { useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import expandOutline from '@/assets/icons/expand-outline.svg'
import imageOutline from '@/assets/icons/image-ouline.svg'
import rectangle11 from '@/assets/icons/rectangle11.svg'
import rectangle169 from '@/assets/icons/rectangle169.svg'
import rectangle45 from '@/assets/icons/rectangle45.svg'
import s from './crop.module.scss'
import { useTranslation } from '@/hooks'

type PropsType = {
  id: number
  setAspectRatio: (id: number, aspect: number) => void
  className?: string
}

export const Crop = ({ setAspectRatio, id }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const cropRef = useRef() as MutableRefObject<HTMLDivElement>
  const { t } = useTranslation()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cropRef.current && !e.composedPath().includes(cropRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={cropRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={s.cropBtn}>
        <Image
          src={expandOutline}
          alt="crop"
          width={24}
          height={24}
          className={isOpen ? s.blueActive : s.blue}
        />
      </div>
      {isOpen && (
        <div className={s.cropOptions}>
          <div className={s.cropOption1} onClick={() => setAspectRatio(id, 4 / 3)}>
            {t.post.addNewPost.original}
            <Image
              src={imageOutline}
              alt="image"
              style={{ position: 'relative', left: '3px' }}
              width={24}
              height={24}
            />
          </div>
          <div className={s.cropOption} onClick={() => setAspectRatio(id, 1)}>
            1:1
            <Image src={rectangle11} alt="rect11" width={18} height={18} />
          </div>
          <div className={s.cropOption} onClick={() => setAspectRatio(id, 4 / 5)}>
            4:5
            <Image src={rectangle45} alt="rect45" width={18} height={26} />
          </div>
          <div className={s.cropOption} onClick={() => setAspectRatio(id, 16 / 9)}>
            16:9
            <Image src={rectangle169} alt="rect169" width={26} height={20} />
          </div>
        </div>
      )}
    </div>
  )
}
