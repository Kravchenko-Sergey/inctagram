import { ChangeEvent, memo, useCallback, useRef, useState } from 'react'

import { Button, Avatar, Typography, Modal, Loader } from '@/components'
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '@/services/profile/profile-api'
import { DeleteIcon, ImageOutline } from '@/assets/icons'
import { useTranslation } from '@/hooks'
import { permittedFileSize, permittedFileTypes } from '@/consts/image'

import s from './profile-image.module.scss'

type ProfileImageProps = {
  avatars?: string
  className?: string
}

export const ProfileImage = memo(({ avatars = '' }: ProfileImageProps) => {
  const { t } = useTranslation()
  const [uploadAvatar, { isLoading: isAvatarUploading }] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [url, setUrl] = useState<string>(avatars)
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string>('')
  const [uploadError, setUploadError] = useState<string>('')
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

  const handleCloseModal = () => {
    setPreviewAvatar('')
    setIsModalOpen(false)
    setAvatarEditMode(false)
  }

  const deleteAvatarHandler = useCallback(async () => {
    try {
      await deleteAvatar().unwrap()
      setUrl('')
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
    <div className={s.profileImageContainer}>
      <div className={s.userImageBox}>
        <div className={s.userImage}>
          <div className={s.profileAvatar}>
            <Avatar photo={url} size={192} />
            {url && (
              <Button
                variant="withIcon"
                className={s.deleteAvatarIcon}
                type="button"
                onClick={deleteAvatarHandler}
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          fullWidth
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          {t.profile.addAvatar}
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={t.profile.addAvatar}
        className={s.modalContent}
        onOpenChange={handleCloseModal}
      >
        <div className={s.modalInnerContent}>
          {isAvatarUploading ? (
            <Loader className={s.modalLoader} />
          ) : (
            <>
              {uploadError && <div className={s.uploadError}>{uploadError}</div>}
              <div className={s.addUserImage}>
                <Avatar photo={previewAvatar} size={316} />
              </div>
              {avatarEditMode ? (
                <Button variant="primary" onClick={handleSaveCloseModal} className={s.saveButton}>
                  <Typography variant="h3">{t.profile.saveChanges}</Typography>
                </Button>
              ) : (
                <>
                  <Button variant="primary" onClick={() => inputRef && inputRef.current?.click()}>
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
            </>
          )}
        </div>
      </Modal>
    </div>
  )
})
