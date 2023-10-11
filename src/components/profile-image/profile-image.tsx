import { Button } from '@/components'
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '@/api/profile-api/profile.api'
import { ChangeEvent, memo, useCallback, useRef, useState } from 'react'
import { RegisterError } from '@/types'
import { Avatar } from '@/components/avatar'
import { DeleteAvatarIcon } from '@/assets/icons/delete-avatar-cross'
import { ImageOutline } from '@/assets/icons'
import { Typography } from '@/components/typography'
import { Modal } from '@/components/modal'
import s from './profile-image.module.scss'
import { useTranslation } from '@/hooks'

export const ProfileImage = memo(() => {
  const { t } = useTranslation()
  const [uploadAvatar, { error: uploadAvatarError }] = useUploadAvatarMutation()
  const [deleteAvatar, { error: deleteAvatarError }] = useDeleteAvatarMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null)
  const permittedFileTypes = ['jpg', 'jpeg', 'png']
  const permittedFileSize = 10485760 // 10Mb in bytes
  const [previewAvatar, setPreviewAvatar] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [avatarEditMode, setAvatarEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
          setPreviewAvatar(reader.result)
          setAvatarEditMode(true)
        }

        let reader = new FileReader()

        reader.addEventListener('load', previewPhoto.bind(this, reader))
        reader.readAsDataURL(file)
        setNewAvatarFile(file)
      } else if (!matches) {
        setUploadError(t.errors.imageFormatError)
      } else {
        setUploadError(t.errors.imageSizeError)
      }
    }
  }

  const handleOpenModal = () => {
    setUploadError('')
    setPreviewAvatar(url)
  }

  const handleCloseModal = () => {
    setPreviewAvatar('')
    setIsModalOpen(false)
    setAvatarEditMode(false)
  }

  const deleteAvatarHandler = useCallback(async () => {
    try {
      await deleteAvatar().unwrap()
    } catch (e: unknown) {
      // const error = e as RegisterError
      const error = e as any

      console.log(error)
    }
  }, [deleteAvatar])

  const handleSaveCloseModal = async () => {
    const formData = new FormData()

    if (newAvatarFile) {
      formData.append('file', newAvatarFile)
    }
    try {
      await uploadAvatar(formData).unwrap()
      setUrl(previewAvatar)
      setIsModalOpen(false)
      setAvatarEditMode(false)
    } catch (e: unknown) {
      // const error = e as RegisterError
      const error = e as any

      setUploadError(error.data.message)
    }
  }

  return (
    <>
      <div className={s.userImageBox}>
        <div className={s.userImage}>
          {url ? (
            <div className={s.profileAvatar}>
              <Avatar photo={url} name="avatar" size={198} />
              <Button
                variant={'withIcon'}
                className={s.deleteAvatarIcon}
                type={'button'}
                onClick={deleteAvatarHandler}
              >
                <DeleteAvatarIcon />
              </Button>
            </div>
          ) : (
            <ImageOutline />
          )}
        </div>
        <Button
          variant={'ghost'}
          fullWidth
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          {t.profile.addAvatar}
        </Button>
        <div className={s.line2}></div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={t.profile.addAvatar}
        className={s.modalContent}
        onOpenChange={handleCloseModal}
      >
        <div className={s.modalInnerContent}>
          <div className={s.addUserImage}>
            {previewAvatar ? (
              <Avatar photo={previewAvatar} name="avatar" size={316} />
            ) : (
              <ImageOutline />
            )}
            {uploadError && <div className={s.uploadError}>{uploadError}</div>}
          </div>
          {avatarEditMode ? (
            <Button variant={'primary'} onClick={handleSaveCloseModal} className={s.saveButton}>
              <Typography variant={'h3'}>{t.profile.saveChanges}</Typography>
            </Button>
          ) : (
            <>
              <Button variant={'primary'} onClick={() => inputRef && inputRef.current?.click()}>
                {t.profile.selectImage}
              </Button>
              <input
                ref={inputRef}
                type="file"
                onChange={uploadHandler}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>
      </Modal>
    </>
  )
})