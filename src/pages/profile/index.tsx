import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  Button,
  HeadMeta,
  getMainLayout,
  Typography,
  Loader,
  ExpandableText,
  Avatar,
} from '@/components'
import { PATH } from '@/consts/route-paths'
import { useMeQuery } from '@/services/auth/auth-api'
import { useGetProfileQuery } from '@/services/profile/profile-api'
import { useTranslation } from '@/hooks'
import {
  CreatePostCommentResponse,
  useDeleteUserPostMutation,
  useGetUserPostsQuery,
} from '@/services/posts'

import s from './profile.module.scss'

const Profile = () => {
  const [pageSize, setPageSize] = useState(8)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()

  const { data: me } = useMeQuery()
  const { data: profile, isLoading, isFetching } = useGetProfileQuery({ profileId: me?.userId })
  const { data: posts } = useGetUserPostsQuery({ pageSize })
  const [deletePost] = useDeleteUserPostMutation()

  const loadMorePosts = () => {
    setPageSize(prev => prev + 8)
    pageSize > publications && setHasMorePosts(false)
  }

  const deletePostHandler = async (postId: number) => {
    deletePost({ postId }).unwrap()
  }

  console.log(posts)

  if (isLoading || isFetching) {
    return <Loader />
  }

  const following = 2218
  const followers = 2358
  const publications = posts?.items.length as number

  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <div className={s.profile}>
          <Avatar photo={profile?.avatars[0]?.url} />
          <div className={s.info}>
            <Typography variant="large">{profile?.userName}</Typography>
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
            <Link passHref legacyBehavior href={PATH.PROFILE_SETTINGS}>
              <Button as="a" variant="secondary" className={s.btn}>
                {t.profile.profileSettings}
              </Button>
            </Link>
          </div>
        </div>
        <InfiniteScroll
          dataLength={publications || 0}
          next={loadMorePosts}
          hasMore={hasMorePosts}
          loader={<Loader className={s.loader} />}
          className={s.posts}
        >
          {posts?.items.map((post: CreatePostCommentResponse) => (
            <div key={post.id} className={s.postWrapper}>
              <Image
                src={post?.images[0]?.url}
                alt={`post ${post.id} image`}
                width={228}
                height={228}
                key={post.id}
                className={s.post}
              />
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  deletePostHandler(post.id)
                }}
              >
                Удалить пост
              </Button>
            </div>
          ))}
        </InfiniteScroll>
        <div className={s.scrollableContent}></div>
      </main>
    </>
  )
}

Profile.getLayout = getMainLayout
export default Profile
