import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from './profile-settings.module.scss'
import { getMainLayout } from '@/components/layout/main-layout/main-layout'
import { Tabs } from '@/components/tabs'
import { useTranslation } from '@/hooks/use-translation'
import { ProfileUpdate } from '@/components/profile-update/profile-update'
import { Button } from '@/components/button'
import { ImageOutline } from '@/assets/icons/image-outline'
import { useUpdateProfileMutation } from '@/api/profile-api/profile.api'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { ProfileSettingsFormValues } from '@/schemas/profile-settings-schema'
import { Avatar } from '@/components/avatar'
import { Modal } from '@/components/modal'
import { Typography } from '@/components/typography'

const ProfileSettings = () => {
  const { t } = useTranslation()

  const [updateProfile, { error, isLoading }] = useUpdateProfileMutation()
  const { data: me, isLoading: dataLoading, isError } = useMeQuery()
  const updateProfileHandler = (data: ProfileSettingsFormValues) => {
    updateProfile(data)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [previewAvatar, setPreviewAvatar] = useState('')
  const [avatarEditMode, setAvatarEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      let previewPhoto = function (reader) {
        setPreviewAvatar(reader.result)
        setAvatarEditMode(true)
      }

      let reader = new FileReader()

      reader.addEventListener('load', previewPhoto.bind(this, reader))
      reader.readAsDataURL(file)
    }
  }
  const handleOpenModal = () => {
    setPreviewAvatar(url)
  }

  const handleCloseModal = () => {
    setPreviewAvatar('')
    setIsModalOpen(false)
    setAvatarEditMode(false)
  }

  const handleSaveCloseModal = () => {
    setUrl(previewAvatar)
    setIsModalOpen(false)
    setAvatarEditMode(false)
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
            {url ? <Avatar photo={url} name="avatar" size={198} /> : <ImageOutline />}
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
