import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PlusSquareOutline } from '@/assets/icons'
import imageOutline from '@/assets/icons/image-ouline.svg'
import { AddedImages } from './added-images'
import s from './add.module.scss'
import { ImageType, setImage } from '@/components/posts/create/create-post-slice'
import { useAppDispatch } from '@/services'

type PropsType = {
  addedImages: ImageType[]
}

export const Add = ({ addedImages }: PropsType) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsAddOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const dispatch = useAppDispatch()
  const handleImageUpload = (e: any) => {
    dispatch(setImage({ img: URL.createObjectURL(e.target.files[0]) }))
  }

  return (
    <div ref={addRef} className={s.wrapper}>
      <div className={s.addBtn}>
        <Image
          src={imageOutline}
          alt="add photo"
          onClick={() => setIsAddOpen(!isAddOpen)}
          width={24}
          height={24}
          className={isAddOpen ? s.blueActive : s.blue}
        />
      </div>
      {isAddOpen && (
        <div className={s.addContainer}>
          {addedImages.length && <AddedImages addedImages={addedImages} />}
          {addedImages.length < 10 ? (
            <div
              className={addedImages.length === 1 ? s.addTheSecondPhoto : s.addPhotoBtn}
              onClick={selectFileHandler}
            >
              <PlusSquareOutline />
              <input
                type="file"
                ref={inputRef}
                name="cover"
                onChange={handleImageUpload}
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}
