import { HeadMeta } from '@/components'

import s from './profile.module.scss'
import { ProfileMain } from '@/components/profile/profile-main'
import { wrapper } from '@/services'
import { getMixedLayout } from '@/components/layout'
import {
  getProfileData,
  getPublicPost,
  getRunningQueriesThunk,
  getUserPostsData,
} from '@/services/public-posts'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id
  const postId = context.query?.postId

  const result = await store.dispatch(getProfileData.initiate({ profileId: +id! }))

  if (id) {
    await store.dispatch(getUserPostsData.initiate({ userId: +id }))
  }

  if (postId) {
    await store.dispatch(getPublicPost.initiate({ postId: +postId! }))
  }

  if (!result) {
    return {
      notFound: true,
    }
  }
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
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
