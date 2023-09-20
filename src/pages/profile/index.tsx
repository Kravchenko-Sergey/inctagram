import React from 'react'

import { useRouter } from 'next/router'

import { en } from '../../../locales/en'
import { ru } from '../../../locales/ru'

import { HeadMeta } from '@/components/head-meta'

const Profile = () => {
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru

  return (
    <>
      <HeadMeta title="Profile" />
      <main>Profile</main>
      <h1>{t.test}</h1>
    </>
  )
}

export default Profile
