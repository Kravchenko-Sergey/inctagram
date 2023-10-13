import { useRouter } from 'next/router'
import Image from 'next/image'

import { Button, HeadMeta, getMainLayout, Typography, Loader } from '@/components'
import { PATH } from '@/consts/route-paths'
import { ImageOutline } from '@/assets/icons'
import { useMeQuery } from '@/api/auth-api/auth.api'
import { useGetProfileQuery } from '@/api/profile-api/profile.api'

import s from './profile.module.scss'
import { useTranslation } from '@/hooks'
import Link from 'next/link'
import { Avatar } from '@/components/avatar'

const Profile = () => {
  const { data: me } = useMeQuery()
  const {
    data: profile,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetProfileQuery({ profileId: me?.userId })
  const { t } = useTranslation()

  // const isFilledProfile = useMemo(() => {
  //   if (profile) return Object.values(profile).some(value => value === null)
  // }, [profile])

  // if (isSuccess && isFilledProfile) {
  //   push(PATH.PROFILE_SETTINGS)
  // }

  if (isLoading || isFetching) {
    return <Loader />
  }
  // if (isSuccess && isFilledProfile) return

  const followers = '123'
  const isProfile = profile?.avatars.length !== 0

  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <div className={s.profile}>
          {isProfile ? (
            <Avatar
              photo={profile?.avatars[0]?.url}
              size={198}
              name={t.profile.avatarAlt}
              className={s.photo}
            />
          ) : (
            <div className={s.photo}>
              <ImageOutline />
            </div>
          )}

          <div className={s.info}>
            <Typography variant="large">{profile?.userName}</Typography>
            <div className={s.items}>
              <div>
                <Typography>2 218</Typography>
                <Typography>{t.profile.following}</Typography>
              </div>
              <div>
                <Typography>{followers}</Typography>
                <Typography>{t.profile.followers}</Typography>
              </div>
              <div>
                <Typography>2 764</Typography>
                <Typography>{t.profile.publications}</Typography>
              </div>
            </div>
            <Typography>{profile?.aboutMe}</Typography>
            <Link passHref legacyBehavior href={PATH.PROFILE_SETTINGS}>
              <Button as="a" variant="secondary" className={s.btn}>
                {t.profile.profileSettings}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
