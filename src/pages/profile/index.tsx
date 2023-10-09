import React from 'react'
import { HeadMeta } from '@/components/head-meta'
import { getMainLayout } from '@/components/layout/main-layout/main-layout'
import { Button } from '@/components/button'

const Profile = () => {
  return (
    <>
      <HeadMeta title="Profile" />
      <main>Profile</main>
      <Button href={'/profile-settings'} as="a" variant="secondary">
        Profile Settings
      </Button>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
