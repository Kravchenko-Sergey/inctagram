import { Button, HeadMeta, getMainLayout, Typography, Loader } from '@/components'
import { PATH } from '@/consts/route-paths'
import { ImageOutline } from '@/assets/icons'
import { useMeQuery } from '@/services/auth/auth-api'
import { useGetProfileQuery } from '@/services/profile/profile-api'

import s from './profile.module.scss'
import { useTranslation } from '@/hooks'
import Link from 'next/link'
import { Avatar } from 'src/components/ui/avatar'
import { FC, useCallback, useState } from 'react'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  CreatePostCommentResponse,
  useDeleteUserPostMutation,
  useGetUserPostsQuery,
} from '@/services/posts'

const Profile = () => {
  const [pageSize, setPageSize] = useState(8)
  const [hasMorePosts, setHasMorePosts] = useState(true)
  const { t } = useTranslation()

  const { data: me } = useMeQuery()
  const { data: profile, isLoading, isFetching } = useGetProfileQuery({ profileId: me?.userId })
  const { data: posts } = useGetUserPostsQuery({ pageSize })
  const [deletePost, { error: deletePostError }] = useDeleteUserPostMutation()

  const loadMorePosts = () => {
    setPageSize(prev => prev + 8)
    pageSize > publications && setHasMorePosts(false)
  }

  const deletePostHandler = async postId => {
    deletePost({ postId }).unwrap()
  }

  console.log(posts)

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

  const following = 2218
  const followers = 2358
  const publications = posts?.items.length as number
  const isProfile = profile?.avatars.length !== 0

  return (
    <>
      <HeadMeta title="Profile" />
      <main className={s.root}>
        <div className={s.profile}>
          {isProfile ? (
            <Avatar
              photo={profile?.avatars[0]?.url}
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
            <ExpandableText text={profile?.aboutMe} />
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

type ExpandableTextProps = {
  text: string | null | undefined
}

const ExpandableText: FC<ExpandableTextProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sentences = text?.split('. ')
  const closedText = sentences && sentences[0].split(' ')
  const preTriggerText = closedText && closedText.slice(0, -1).join(' ')
  const openTrigger = closedText && closedText.slice(-1).join(' ')
  const restText = sentences && sentences.slice(1).join('. ')

  return (
    sentences && (
      <div>
        <span>{preTriggerText}</span>
        <span
          onClick={() => setIsExpanded(true)}
          className={!isExpanded ? s.expandDescription : ''}
        >
          {isExpanded ? ` ${openTrigger}. ` : ` ${openTrigger}...`}
        </span>
        <span>{isExpanded ? restText : ''}</span>
      </div>
    )
  )
}
