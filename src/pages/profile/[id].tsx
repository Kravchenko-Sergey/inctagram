import { getMainLayout, HeadMeta } from '@/components'

import s from './profile.module.scss'
import PublicProfile from '@/components/profile/public-profile/public-profile'

const ProfilePublic = () => {
  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <PublicProfile />
      </main>
    </>
  )
}

ProfilePublic.getLayout = getMainLayout
export default ProfilePublic
