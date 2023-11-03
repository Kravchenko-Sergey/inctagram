import { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import maximize from '@/assets/icons/maximize-outline.svg'

import s from './zoom.module.scss'

type PropsType = {
  className?: string
  zoom: number
  setZoom: (zoom: number) => void
}

export const Zoom: FC<PropsType> = ({ zoom, setZoom }) => {
  const [isOpen, setIsOpen] = useState(false)
  const zoomRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (zoomRef.current && !e.composedPath().includes(zoomRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value)

    setZoom(scale)
  }

  return (
    <div ref={zoomRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={s.zoomBtn}>
        <Image
          src={maximize}
          alt="zoom"
          width={24}
          height={24}
          className={isOpen ? s.blueActive : s.blue}
        />
      </div>

      {isOpen && (
        <div className={s.slider}>
          <input
            className={s.range}
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={onZoomChange}
          />
        </div>
      )}
    </div>
  )
}
