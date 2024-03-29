import { useTranslation } from '@/hooks'
import { useAppDispatch, useAppSelector } from '@/services'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { permittedFileTypes, permittedPostPhotoFileSize } from '@/consts/image'
import {
  nextPage,
  setDraft,
  setImage,
  setPage,
  setPublicationText,
} from '@/components/posts/create/create-post-slice'
import { toast } from 'react-toastify'
import s from '@/components/posts/create/create-post-modal.module.scss'
import { ImageOutline } from '@/assets/icons'
import { Button, Typography } from '@/components'
import {
  draftTable,
  database,
  pageTable,
  textPublicationTable,
} from '@/components/posts/create/database.config'

export const AddPhotoPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [hasDraft, setHasDraft] = useState(false)

  useLayoutEffect(() => {
    let res = localStorage.getItem('save-in-db')

    if (res) {
      setHasDraft(JSON.parse(res))
    }
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const images = useAppSelector(state => state.createPost.images)

  const handleImageUpload = (e: any) => {
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
      dispatch(setImage({ img: URL.createObjectURL(e.target.files[0]) }))
      dispatch(nextPage())
      database.delete()
    } else {
      toast.error(t.errors.imageUploadError, { icon: false })
    }
  }

  const onOpenDraftHandler = async () => {
    let res = await draftTable.toArray()
    let page = await pageTable.toArray()
    let publicationText = await textPublicationTable.toArray()

    const isNotEmptyPublicationText = !!publicationText[0]

    dispatch(setDraft(res))
    dispatch(setPage(page[0]))

    if (isNotEmptyPublicationText) {
      dispatch(setPublicationText({ publication: publicationText[0].publication }))
    }

    database.delete()
  }

  return (
    <>
      <div className={`${s.photoContainer} ${images === null ? s.emptyPhotoContainer : ''}`}>
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
      {hasDraft && (
        <Button variant={'ghost'} onClick={onOpenDraftHandler} className={s.btn}>
          {t.post.openDraft}
        </Button>
      )}
    </>
  )
}
