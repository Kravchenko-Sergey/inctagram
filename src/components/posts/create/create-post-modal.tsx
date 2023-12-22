import { ReactNode, useRef, useState } from 'react'
import { useTranslation } from '@/hooks'
import { Button, Loader, Typography } from '@/components'
import { ArrowBack, ArrowDownIcon, ArrowLeft, ImageOutline } from '@/assets/icons'
import { CroppedImage } from './cropped-image'
import { permittedPostPhotoFileSize, permittedFileTypes } from '@/consts/image'
import { toast } from 'react-toastify'
import s from './create-post-modal.module.scss'

import { SelectedImages } from '@/components/posts/create/edit-photo'
import { FilteredImages, PostDescription } from '@/components/posts/create/add-description'
import getCroppedImg from '@/components/posts/create/cropped-image/Crop'
import { useAppDispatch, useAppSelector } from '@/services'
import {
  changeFilter,
  revalidateImage,
  setImage,
  setNextPage,
  setPrevPage,
} from '@/components/posts/create/create-post-slice'
import { PostHeader } from 'src/components/posts/create/header-post'
import { FixModal, HeaderContent } from '@/components/ui/modal/fix-modal/fix-modal'

export type ImageType = {
  image: string
  id?: string
  croppedImage?: string
  filter: string
  zoom: number
  aspect: number
}

export const CreatePostModal = () => {
  const { t } = useTranslation()

  const [openModal, setOpenModal] = useState(false)

  const onOpenModal = () => setOpenModal(!openModal)

  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.createPostInfo.page)

  const croppedImg = useAppSelector(state => state.createPostInfo.croppedImg)

  const onUpPageChange = () => dispatch(setNextPage())
  const onDownPageChange = () => dispatch(setPrevPage())

  const showCroppedImg = async () => {
    //добавить лоадер
    const promises = croppedImg.map(async el => {
      const newCroppedImg = await getCroppedImg(el.image, el.cropArgs)

      return { id: el.id, img: newCroppedImg }
    })

    const results = await Promise.all(promises)

    results.forEach(result => {
      if (result.img) {
        dispatch(revalidateImage({ id: result.id, img: result.img }))
      }
    })
    toast.success(t.post.addNewPost.pictureCropped, { icon: false })

    onUpPageChange()
  }

  const headerAddModal: HeaderContent = {
    type: 'title',
    title: 'Add Photo',
  }

  const croppingHeader: HeaderContent = {
    type: 'node',
    node: (
      <PostHeader
        leftButton={{ title: <ArrowBack width={24} height={24} />, callback: onDownPageChange }}
        rightButton={{ title: 'Next', callback: showCroppedImg }}
        modalTitle={'Cropping'}
      />
    ),
  }

  const filterHeader: HeaderContent = {
    type: 'node',
    node: (
      <PostHeader
        leftButton={{ title: <ArrowBack width={24} height={24} />, callback: onDownPageChange }}
        rightButton={{ title: 'Next', callback: onUpPageChange }}
        modalTitle={'Filter'}
      />
    ),
  }

  const publicationHeader: HeaderContent = {
    type: 'node',
    node: (
      <PostHeader
        leftButton={{ title: <ArrowBack width={24} height={24} />, callback: onDownPageChange }}
        rightButton={{ title: 'Publish', callback: onUpPageChange }}
        modalTitle={'Publication'}
      />
    ),
  }

  const childrenModal = [
    {
      headerProps: headerAddModal,
      children: <AddPhotoPage onUpChangePage={onUpPageChange} />,
    },
    {
      headerProps: croppingHeader,
      children: <CroppedImage />,
    },
    {
      headerProps: filterHeader,
      children: <FilterPage />,
    },
    {
      headerProps: publicationHeader,
      children: <PublicationPage />,
    },
  ]
  const classNames = [
    `${s.addPhotoContainer}`,
    's.croppedContainer',
    's.croppedContainer',
    's.croppedContainer',
  ]

  return (
    <>
      <button onClick={onOpenModal}>open</button>
      <FixModal
        open={openModal}
        onOpenChange={onOpenModal}
        headerContent={childrenModal[page].headerProps}
        className={`${classNames[page]}`}
      >
        {childrenModal[page].children}
      </FixModal>
    </>
  )
}

const PublicationPage = () => {
  const addedImages = useAppSelector(state => state.createPostInfo.images)

  return (
    <div className={s.PublicationPageContainer}>
      <FilteredImages addedImages={addedImages} />
      <PostDescription addedImages={addedImages} />
    </div>
  )
}

const FilterPage = () => {
  const dispatch = useAppDispatch()
  const filteredImage = (filter: string, id: string) => dispatch(changeFilter({ filter, id }))

  const image = useAppSelector(state => state.createPostInfo.images)

  return <SelectedImages addedImages={image} filteredImage={filteredImage} />
}

type AddPhotoProps = {
  onUpChangePage: () => void
}

const AddPhotoPage = ({ onUpChangePage }: AddPhotoProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => inputRef && inputRef.current?.click()
  const dispatch = useAppDispatch()
  const image = useAppSelector(state => state.createPostInfo.images)

  const handleImageUpload = async (e: any) => {
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
      const imageUrl = URL.createObjectURL(file)

      dispatch(setImage({ image: imageUrl }))
      onUpChangePage()
    } else {
      toast.error(t.errors.imageUploadError, { icon: false })
    }
  }

  return (
    <>
      <div className={`${s.photoContainer} ${image[0] === null ? s.emptyPhotoContainer : ''}`}>
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
    </>
  )
}
