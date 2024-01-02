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
import { Post } from '@/services/posts'

export const ProfileMain = memo(() => {
  const size = 5
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const [skipPostRequest, setSkipPostRequest] = useState(true)
  const [page, setPage] = useState(1)
  const { t } = useTranslation()
  const { query } = useTypedRouter(routerProfileSchema)
  const { query: postQuery } = useTypedRouter(routerProfilePostSchema)

  const [postModalIsOpen, setPostModalIsOpen] = useState(false)
  const [idLastUploadedPost, setIdLastUploadedPost] = useState<undefined | number>(undefined)
  const { data: me } = useMeQuery()

  const { data: postData } = useGetPublicPostQuery(
    { postId: +postQuery.postId! },
    { skip: skipPostRequest }
  )

  useEffect(() => {
    if (postQuery.postId) {
      setSkipPostRequest(false)
    }
  }, [postQuery.postId])

  // const {
  //   data: profile,
  //   isLoading,
  //   isFetching,
  //   isError,
  // } = useGetProfileQuery({ profileId: me?.userId })

  useEffect(() => {
    if (postQuery.postId) {
      setPostModalIsOpen(true)
    }
  }, [postQuery.postId])
  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
  } = useGetProfileDataQuery({ profileId: +query.id! })
  //

  const { data: posts } = useGetUserPostsDataQuery({
    userId: +query.id!,
    endCursorPostId: idLastUploadedPost,
    pageSize: size,
  })

  // } = useGetProfileQuery({ profileId: me?.userId })
  // const { data: posts } = useGetUserPostsQuery({
  //   idLastUploadedPost,
  //   pageSize: size,
  // })
  const loadMorePosts = () => {
    if (page === countPage) {
      setHasMorePosts(false)
    } else {
      setPage(prev => prev + 1)
      setIdLastUploadedPost(() => posts?.items[posts.items.length - 1].id)
    }
  }

  const modalPostHandler = useCallback(() => {
    setPostModalIsOpen(prev => !prev)
    // push(`${PATH.PROFILE}/?id=${postQuery.id}`)
  }, [])

  if (isLoading || isFetching) {
    return <Loader />
  }
  if (isError) {
    console.error('Get profile is failed')
  }
  const following = 2218
  const followers = 2358
  const publications = posts?.totalCount as number
  const countPage = Math.ceil(publications / size)
  const profileName = profile?.userName

  return (
    <>
      {postData && (
        <ViewPostModal
          isOpen={postModalIsOpen}
          post={postData!}
          handleModalChange={modalPostHandler}
        />
      )}
      <div className={s.profile}>
        <Avatar photo={profile?.avatars[0]?.url} name={profile?.userName} />
        <div className={s.info}>
          {/*<div className={s.infoColumn}>*/}
          <div className={s.infoHeader}>
            <Typography variant="large">{profileName}</Typography>
            {me?.userId && me?.userId === profile?.id && (
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
          <ExpandableText text={profile?.aboutMe ?? null} />
          {/*</div>*/}
          {/*<Link passHref legacyBehavior href={PATH.PROFILE_SETTINGS}>*/}
          {/*  <Button as="a" variant="secondary" className={s.btn}>*/}
          {/*    {t.profile.profileSettings}*/}
          {/*  </Button>*/}
          {/*</Link>*/}
        </div>
      </div>
      <InfiniteScroll
        dataLength={posts?.items.length || 0}
        next={loadMorePosts}
        hasMore={hasMorePosts}
        loader={posts?.items && posts.items.length > 0 ? <Loader className={s.loader} /> : null}
        className={s.posts}
      >
        {posts?.items.map((post: Post) => <PostCard key={post.id} post={post} />)}
      </InfiniteScroll>
      <div className={s.scrollableContent}></div>
    </>
  )
})
