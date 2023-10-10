import { Button, HeadMeta, getMainLayout } from '@/components'

const Profile = () => {
  return (
    <>
      <HeadMeta title="Profile" />
      <main>Profile</main>
      <Button href="/profile-settings" as="a" variant="secondary">
        Profile Settings
      </Button>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
