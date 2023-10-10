import { Button, HeadMeta, getMainLayout } from '@/components'
import { PATH } from '@/consts/route-paths'

const Profile = () => {
  return (
    <>
      <HeadMeta title="Profile" />
      <main>Profile</main>
      <Button href={PATH.PROFILE_SETTINGS} as="a" variant="secondary">
        Profile Settings
      </Button>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
