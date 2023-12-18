import { HeadMeta } from '@/components'

import s from './profile.module.scss'
import { ProfileMain } from '@/components/profile/profile-main'
import { wrapper } from '@/services'
import { getProfileData, getRunningQueriesThunk } from '@/services/public-posts'
import { getMixedLayout } from '@/components/layout'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id

  const result = await store.dispatch(getProfileData.initiate({ userId: +id! }))

  if (!result) {
    return {
      notFound: true,
    }
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
    // revalidate: 60,
  }
})
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

Profile.getLayout = getMixedLayout

export default Profile
