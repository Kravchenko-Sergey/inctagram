import { Button, HeadMeta, getMainLayout, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import s from './profile.module.scss'
import { ImageOutline } from '@/assets/icons'
import { useGetProfileQuery } from '@/api/profile-api/profile.api'
import { useMeQuery } from '@/api/auth-api/auth.api'

const Profile = () => {
  const { data: me } = useMeQuery()
  const { data: profile, isLoading } = useGetProfileQuery({ profileId: me?.userId })

  console.log(profile)

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <div className={s.profile}>
          {profile?.avatars.length !== 0 ? (
            <img
              src={String(profile?.avatars[0]?.url)}
              alt="Аватар пользователя"
              className={s.photo}
            />
          ) : (
            <ImageOutline className={s.photo} />
          )}

          <div className={s.info}>
            <Typography variant="large">{profile?.userName}</Typography>
            <div className={s.items}>
              <div>
                <Typography>2 218</Typography>
                <Typography>Following</Typography>
              </div>
              <div>
                <Typography>2 358</Typography>
                <Typography>Followers</Typography>
              </div>
              <div>
                <Typography>2 764</Typography>
                <Typography>Publications</Typography>
              </div>
            </div>
            <Typography>{profile?.aboutMe}</Typography>
            <Button href={PATH.PROFILE_SETTINGS} as="a" variant="secondary" className={s.btn}>
              Profile Settings
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
