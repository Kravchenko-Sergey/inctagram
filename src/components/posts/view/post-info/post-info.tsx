import { Typography, Avatar } from '@/components'
import { Post } from '@/services/posts'
import { getTimeAgo } from '@/helpers/date'

import s from './post-info.module.scss'

type PropsType = {
  avatar?: string
  post: Post
  userName?: string
}

export const PostInfo = ({ avatar, userName, post }: PropsType) => {
  const date = getTimeAgo(post.createdAt)

  return (
    <>
      <div className={s.descriptionWrapper}>
        <Avatar photo={avatar} size={36} className={s.avatar} />
        <div className={s.text}>
          <Typography variant="bold_text_14">{userName}</Typography>{' '}
          <Typography variant="regular_text_14">{post.description}</Typography>
          <Typography variant="small_text" className={s.date}>
            {date}
          </Typography>
        </div>
      </div>

      <div>**** Comments ****</div>
    </>
  )
}
