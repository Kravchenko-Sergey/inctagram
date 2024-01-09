import { Avatar, Typography } from '@/components'
import { getTimeAgo } from '@/helpers/date'

import s from './post-info.module.scss'
import { PostProfile } from '@/services/public-posts'

type PropsType = {
  avatar?: string
  post: PostProfile
  userName?: string
}

export const PostInfo = ({ avatar, userName, post }: PropsType) => {
  const date = getTimeAgo(post.createdAt)

  return (
    <div>
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
    </div>
  )
}
