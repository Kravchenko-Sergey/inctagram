import React, { ChangeEvent, useCallback, useRef, useState } from 'react'

import s from './profile-settings.module.scss'
import { getMainLayout } from '@/components/layout/main-layout/main-layout'
import { Tabs } from '@/components/tabs'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileUpdate } from '@/components/profile-update/profile-update'
import { Button } from '@/components/button'
import { ImageOutline } from '@/assets/icons/image-outline'
import {
  useDeleteAvatarMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/api/profile-api/profile.api'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { ProfileSettingsFormValues } from '@/schemas/profile-settings-schema'
import { Avatar } from '@/components/avatar'
import { Modal } from '@/components/modal'
import { Typography } from '@/components/typography'
import { RegisterError } from '@/types'
import { ForgotPasswordSchemaType } from '@/schemas'
import { DeleteAvatarIcon } from '@/assets/icons/delete-avatar-cross'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
  const [uploadAvatar, { error: uploadAvatarError }] = useUploadAvatarMutation()
  const [deleteAvatar, { error: deleteAvatarError }] = useDeleteAvatarMutation()
  const { data: me, isLoading: dataLoading, isError } = useMeQuery()
  const updateProfileHandler = (data: ProfileSettingsFormValues) => {
    updateProfile(data)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [newAvatarFile, setNewAvatarFile] = useState(null)
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
        let previewPhoto = function (reader) {
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
      const error = e as RegisterError

      console.log(error)
    }
  }, [deleteAvatar])

  const onAvatarUpload = useCallback(async () => {
    try {
      await uploadAvatar({
        avatars: newAvatarFile,
      }).unwrap()
      setUrl(previewAvatar)
      setIsModalOpen(false)
      setAvatarEditMode(false)
    } catch (e: unknown) {
      const error = e as RegisterError

      setUploadError(error)
    }
  }, [uploadAvatar])

  const handleSaveCloseModal = async () => {
    console.log(newAvatarFile)
    onAvatarUpload()
    // setUrl(previewAvatar)
    // setIsModalOpen(false)
    // setAvatarEditMode(false)
  }

  const profileTabs = [
    { value: 'tab1', title: t.profile.generalInfo },
    { value: 'tab2', title: t.profile.devices },
    { value: 'tab3', title: t.profile.accManagement },
    { value: 'tab4', title: t.profile.myPayments },
  ]

  return (
    <div className={s.root}>
      <div>
        <Tabs tabsList={profileTabs} />
      </div>
      <div className={s.formContent}>
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
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            {t.profile.addAvatar}
          </Button>
          <div className={s.line2}></div>
        </div>
        <div className={s.form}>
          <ProfileUpdate updateProfileHandler={updateProfileHandler} />
        </div>
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
    </div>
  )
}

ProfileSettings.getLayout = getMainLayout
export default ProfileSettings
