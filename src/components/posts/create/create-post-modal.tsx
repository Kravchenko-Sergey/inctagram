import { useRef, useState } from 'react'

import { useTranslation } from '@/hooks'
import { Button, Loader, Typography } from '@/components'
import { ImageOutline } from '@/assets/icons'
import { CropModal } from './crop-modal'
import { CroppedImage } from './cropped-image'
import { BaseModal } from './base-modal'
import { permittedPostPhotoFileSize, permittedFileTypes } from '@/consts/image'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'
import { toast } from 'react-toastify'
import s from './create-post-modal.module.scss'
import { useMeQuery } from '@/services/auth'

export type ImageType = {
  image: string
  id?: string
  croppedImage?: string
}

export const CreatePostModal = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [addedImages, setAddedImages] = useState<ImageType[]>([])
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const { push } = useRouter()
  const { data: me } = useMeQuery()

  const handleButtonClick = () => {
    // push(PATH.PROFILE)
    push(`${PATH.PROFILE}/?id=${+me?.userId!}`)

    //setIsBaseModalOpen(false)
    setImage(null)
    setIsModalOpen(false)
  }
  const cancelButtonClick = () => {
    //push(PATH.PROFILE)
    push(`${PATH.PROFILE}/?id=${+me?.userId!}`)
    //setIsBaseModalOpen(false)
    setIsModalOpen(false)
  }
  const handleImageUpload = async (e: any) => {
    // ToDo сделать инпут контролируемым тут и в добавлении аватара
    const uploadInput = e.target

    if (
      !(uploadInput instanceof HTMLInputElement) ||
      !uploadInput.files ||
      !uploadInput.files.length
    ) {
      return
    }

    const file = uploadInput.files[0]

    const fileName = file.name.toLowerCase()
    const matches = [...permittedFileTypes].some(it => fileName.endsWith(it))

    if (matches && file.size <= permittedPostPhotoFileSize) {
      setAddedImages([
        {
          id: (addedImages.length + 1).toString(),
          image: URL.createObjectURL(e.target.files[0]),
        },
      ])
      setIsBaseModalOpen(false)
      setIsModalOpen(true)
    } else {
      toast.error(t.errors.imageUploadError, { icon: false })
    }
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  if (isLoadingPost) {
    return <Loader className={s.loader} />
  }

  return (
    <div className={s.container}>
      {!addedImages.length && isBaseModalOpen ? (
        <BaseModal
          modalWidth="md"
          open={isBaseModalOpen}
          onClose={handleButtonClick}
          title={t.post.addNewPost.addPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImageOutline />
          </div>
          <div>
            <Button variant="primary" onClick={selectFileHandler} className={s.btn}>
              <Typography variant="h3">{t.profile.selectImage}</Typography>
            </Button>
            <input
              type="file"
              ref={inputRef}
              name="cover"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
            />
          </div>
        </BaseModal>
      ) : (
        <CropModal
          isPostCreateLoadingHandler={setIsLoadingPost}
          image={image}
          open={isModalOpen}
          onClose={handleButtonClick}
          onCancel={cancelButtonClick}
          title={t.post.addNewPost.cropping}
          addedImages={addedImages}
          setAddedImages={setAddedImages}
          isBaseModalOpen={isBaseModalOpen}
          setIsBaseModalOpen={setIsBaseModalOpen}
          setImage={setImage}
        >
          <CroppedImage
            image={image}
            setImage={setImage}
            addedImages={addedImages}
            setAddedImages={setAddedImages}
          />
        </CropModal>
      )}
    </div>
  )
}
