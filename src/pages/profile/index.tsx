import React from 'react'

import { Button } from '@/components/button'
import { HeadMeta } from '@/components/head-meta'

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

export default Profile
