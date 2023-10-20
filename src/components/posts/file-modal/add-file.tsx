import React, {
  ChangeEvent,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react'

import { ImageOutline } from '@/assets/icons'
import { Button, Modal } from '@/components'
import { useTranslation } from '@/hooks'
import { ImageType, ModalType } from '@/components/posts/add-post/add-post'
import s from './add-file.module.scss'

type AddFileProps = {
  addedImages: ImageType[]
  // isModalOpen: boolean
  setPositionValue: Dispatch<SetStateAction<number>>
  setTypeModal: Dispatch<SetStateAction<ModalType>>
  setAddedImages: Dispatch<SetStateAction<ImageType[]>>
}

export const AddFile = ({
  // setIsModalOpen,
  // isModalOpen,
  setPositionValue,
  setAddedImages,
  addedImages,
  setTypeModal,
}: AddFileProps) => {
  const [uploadError, setUploadError] = useState<string>('')

  const inputRef = useRef<HTMLInputElement | null>(null)
  const permittedFileTypes = ['jpg', 'jpeg', 'png']
  const permittedFileSize = 10485760 // 10Mb in bytes
  const { t } = useTranslation()

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadInput = e.target

    if (uploadInput instanceof HTMLInputElement && uploadInput.files && uploadInput.files.length) {
      const file = uploadInput.files[0]

      if (!file) return setUploadError(t.errors.imageUploadError)
      const fileName = file.name.toLowerCase()

      const matches = [...permittedFileTypes].some(it => {
        return fileName.endsWith(it)
      })

      if (matches && file.size <= permittedFileSize) {
        setUploadError('')
        let previewPhoto = function (reader: any) {
          // setImageURL(reader.result)

          setAddedImages([
            ...addedImages,
            {
              id: (addedImages.length + 1).toString(),
              // image: URL.createObjectURL(reader.result),
              image: reader.result,
            },
          ])
        }

        let reader = new FileReader()

        reader.addEventListener('load', previewPhoto.bind(this, reader))
        reader.readAsDataURL(file)
        setPositionValue(-492)
        setTypeModal('Cropping')
        // setImageURL(file)
      } else if (!matches) {
        setUploadError(t.errors.imageFormatError)
      } else {
        setUploadError(t.errors.imageSizeError)
      }
    }
  }

  return (
    <div className={s.modalContainer}>
      <div className={s.imageContainer}>
        <ImageOutline />
        {uploadError && <div className={s.uploadError}>{uploadError}</div>}
      </div>
      <Button variant={'primary'} onClick={() => inputRef && inputRef.current?.click()}>
        Select from Computer
      </Button>
      <input
        ref={inputRef}
        type="file"
        onClick={event => ((event.target as HTMLInputElement).value = '')}
        onChange={uploadHandler}
        style={{ display: 'none' }}
      />
      <Button variant={'ghost'} className={s.btnFooter} onClick={() => {}}>
        Open Draft
      </Button>
    </div>
  )
}
