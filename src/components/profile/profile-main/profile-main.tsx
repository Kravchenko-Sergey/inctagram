import React, { memo, useState } from 'react'
import { useTranslation, useTypedRouter } from '@/hooks'
import { Avatar, Button, ExpandableText, Loader, PostCard, Typography } from '@/components'
import Link from 'next/link'
import { PATH } from '@/consts/route-paths'
import InfiniteScroll from 'react-infinite-scroll-component'
import s from './profile-main.module.scss'
import { PostProfile, useGetProfileDataQuery } from '@/services/public-posts'
import { routerProfileSchema } from '@/schemas/router-schemas'
import { useMeQuery } from '@/services/auth'

export const ProfileMain = memo(() => {
  const [pageSize, setPageSize] = useState(8)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()
  const { query } = useTypedRouter(routerProfileSchema)

  const { data: me } = useMeQuery()
  // // const {
  // //   data: profile,
  // //   isLoading,
  // //   isFetching,
  // //   isError,
  // // } = useGetProfileQuery({ profileId: me?.userId })
  //

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
  } = useGetProfileDataQuery({ userId: +query.id! })
  //
  // const { data: posts } = useGetUserPostsQuery({ pageSize })

  const loadMorePosts = () => {
    setPageSize(prev => prev + 8)
    pageSize > publications && setHasMorePosts(false)
  }

  if (isLoading || isFetching) {
    return <Loader />
  }
  if (isError) {
    console.error('Get profile is failed')
  }
  const following = 2218
  const followers = 2358
  const publications = profile?.posts.items.length as number

  const profileName = profile?.fullName
    ? `${profile?.profile.firstName} ${profile?.profile.lastName}`
    : profile?.profile.userName

  return (
    <>
      <div className={s.profile}>
        <Avatar photo={profile?.profile.avatars[0]?.url} name={profile?.profile.userName} />
        <div className={s.info}>
          {/*<div className={s.infoColumn}>*/}
          <div className={s.infoHeader}>
            <Typography variant="large">{profileName}</Typography>
            {me?.userId && (
              <Link passHref legacyBehavior href={PATH.PROFILE_SETTINGS}>
                <Button as="a" variant="secondary" className={s.btn}>
                  {t.profile.profileSettings}
                </Button>
              </Link>
            )}
          </div>
          <div className={s.items}>
            <div>
              <Typography>{following}</Typography>
              <Typography>{t.profile.following(following)}</Typography>
            </div>
            <div>
              <Typography>{followers}</Typography>
              <Typography>{t.profile.followers(followers)}</Typography>
            </div>
            <div>
              <Typography>{publications}</Typography>
              <Typography>{t.profile.publications(publications)}</Typography>
            </div>
          </div>
          <ExpandableText text={profile?.profile.aboutMe ?? null} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={publications || 0}
        next={loadMorePosts}
        hasMore={hasMorePosts}
        loader={publications > 0 ? <Loader className={s.loader} /> : null}
        className={s.posts}
      >
        {/*{posts?.items.map((post: Post) => <PostCard key={post.id} post={post} />)}*/}
        {profile?.posts.items.map((post: PostProfile) => <PostCard key={post.id} post={post} />)}
      </InfiniteScroll>
      <div className={s.scrollableContent}></div>
    </>
  )
})
