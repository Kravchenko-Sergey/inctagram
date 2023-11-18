import { getMainLayout, HeadMeta } from '@/components'

import s from './profile.module.scss'
import { ProfileMain } from '@/components/profile/profile-main'

const Profile = () => {
  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <ProfileMain />
      </main>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
