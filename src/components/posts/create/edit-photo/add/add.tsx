import { MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { PlusSquareOutline } from '@/assets/icons'
import imageOutline from '@/assets/icons/image-ouline.svg'
import { ImageType } from '@/components/posts/create'
import { AddedImages } from './added-images'

import s from './add.module.scss'

type PropsType = {
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
  image: string | null
  croppedImage: string | null
}

export const Add = ({ image, addedImages, setAddedImages, croppedImage }: PropsType) => {
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

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages, setAddedImages])

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const handleImageUpload = async (e: any) => {
    setAddedImages([...addedImages, { image: URL.createObjectURL(e.target.files[0]) }])
  }

  return (
    <div ref={addRef} className={s.wrapper}>
      <div className={s.addBtn}>
        <Image
          src={imageOutline}
          alt="add photo"
          onClick={() => setIsAddOpen(true)}
          width={24}
          height={24}
          className={s.blue}
        />
      </div>
      {isAddOpen && (
        <div className={s.addContainer}>
          {addedImages.length && (
            <AddedImages
              croppedImage={croppedImage}
              addedImages={addedImages}
              setAddedImages={setAddedImages}
              image={image}
            />
          )}
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
