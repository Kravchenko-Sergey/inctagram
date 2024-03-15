import React, { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation, useTypedRouter } from '@/hooks'
import { Avatar, Button, ExpandableText, Loader, PostCard, Typography } from '@/components'
import Link from 'next/link'
import { PATH } from '@/consts/route-paths'
import InfiniteScroll from 'react-infinite-scroll-component'
import s from './profile-main.module.scss'
import {
  PostProfile,
  useGetProfileDataQuery,
  useGetPublicPostQuery,
  useGetUserPostsDataQuery,
} from '@/services/public-posts'
import { routerProfilePostSchema, routerProfileSchema } from '@/schemas/router-schemas'
import { useMeQuery } from '@/services/auth'
import { ViewPostModal } from '@/components/posts/view'
import { ProfileInfoItem } from '@/components/ui/profile-info-item'
import { useBooleanFlag } from '@/hooks/useBooleanFlag'

export const ProfileMain = memo(() => {
  const [pageSize, setPageSize] = useState(9)

  const { isTrue: hasMorePosts, setFalse: setFalseHasMorePosts } = useBooleanFlag(true)

  const { isTrue: skipPostRequest, setFalse: setFalseSkipPostRequest } = useBooleanFlag(true)
  const [idLastUploadedPost, setIdLastUploadedPost] = useState('')
  const { t } = useTranslation()
  const { query } = useTypedRouter(routerProfileSchema)
  const { query: postQuery } = useTypedRouter(routerProfilePostSchema)

  const {
    isTrue: postModalOpen,
    setTrue: setTrueModalOpen,
    toggleFlag: setModalToggle,
  } = useBooleanFlag()

  const { data: me } = useMeQuery()

  const { data: postData } = useGetPublicPostQuery(
    { postId: +postQuery.postId! },
    { skip: skipPostRequest }
  )

  useEffect(() => {
    if (postQuery.postId) {
      setFalseSkipPostRequest()
      setTrueModalOpen()
    }
  }, [postQuery.postId, setFalseSkipPostRequest, setTrueModalOpen])

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
  } = useGetProfileDataQuery({ profileId: +query.id! })

  const { data: posts } = useGetUserPostsDataQuery({
    userId: +query.id!,
    pageSize,
  })

  useEffect(() => {
    const lastPostId = posts?.items.slice(-1)[0]?.id.toString()

    if (lastPostId && lastPostId !== idLastUploadedPost) {
      setIdLastUploadedPost(lastPostId)
    }
  }, [idLastUploadedPost, posts])

  const loadMorePosts = () => {
    setPageSize(prev => prev + 9)
    pageSize > publications! && setFalseHasMorePosts()
  }

  const modalPostHandler = useCallback(() => {
    setModalToggle()
    // push(`${PATH.PROFILE}/?id=${postQuery.id}`)
  }, [setModalToggle])

  if (isLoading || isFetching) {
    return <Loader />
  }
  if (isError) {
    console.error('Get profile is failed')
  }
  const following = 2218
  const followers = 2358
  const publications = posts?.totalCount

  const profileName = profile?.userName

  console.log('me', !!me)
  const a = true

  return (
    <>
      {postData && (
        <ViewPostModal
          isOpen={postModalOpen}
          post={postData!}
          handleModalChange={modalPostHandler}
        />
      )}
      <div className={s.profile}>
        <Avatar photo={profile?.avatars[0]?.url} name={profileName} />
        <div className={s.info}>
          <div className={s.infoHeader}>
            <Typography variant="large">{profileName}</Typography>
            {!!me && me?.userId !== profile?.id && (
              <div className={s.bntContainer}>
                <Button as="a" variant="primary" className={s.btn}>
                  {a ? t.homeAuth.unfollow : t.homeAuth.follow}
                </Button>
                <Button as="a" variant="secondary" className={s.btn}>
                  {t.profile.sendMessage}
                </Button>
              </div>
            )}
            {me?.userId && me?.userId === profile?.id && (
              <Link passHref legacyBehavior href={PATH.PROFILE_GENERAL}>
                <Button as="a" variant="secondary" className={s.btn}>
                  {t.profile.profileSettings}
                </Button>
              </Link>
            )}
          </div>
          <div className={s.items}>
            <ProfileInfoItem number={following} item={t.profile.following(following)} />
            <ProfileInfoItem number={followers} item={t.profile.followers(followers)} />
            <ProfileInfoItem number={publications!} item={t.profile.publications(publications!)} />
          </div>
          <ExpandableText text={profile?.aboutMe ?? null} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={publications || 0}
        next={loadMorePosts}
        hasMore={hasMorePosts}
        loader={
          publications! > 9 && publications! < posts?.totalCount! ? (
            <Loader className={s.loader} />
          ) : null
        }
        className={s.posts}
      >
        {posts && posts.items.map((post: PostProfile) => <PostCard key={post.id} post={post} />)}
      </InfiniteScroll>
      <div className={s.scrollableContent}></div>
    </>
  )
})
