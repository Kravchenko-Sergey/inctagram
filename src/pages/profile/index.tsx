import { useRouter } from 'next/router'
import Image from 'next/image'

import { Button, HeadMeta, getMainLayout, Typography, Loader } from '@/components'
import { PATH } from '@/consts/route-paths'
import { ImageOutline } from '@/assets/icons'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { useGetProfileQuery } from '@/api/profile-api/profile.api'

import s from './profile.module.scss'

const Profile = () => {
  const { push } = useRouter()
  const { data: me } = useMeQuery()
  const { data: profile, isLoading, isSuccess } = useGetProfileQuery({ profileId: me?.userId })

  if (isSuccess && !Object.values(profile).every(value => value !== null)) {
    push(PATH.PROFILE_SETTINGS)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <div className={s.profile}>
          {profile?.avatars.length !== 0 ? (
            <Image
              src={String(profile?.avatars[0]?.url)}
              alt="userImage"
              width={198}
              height={198}
              className={s.photo}
              priority
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
