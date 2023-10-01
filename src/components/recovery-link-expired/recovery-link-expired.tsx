import { LinkExpiredIcon } from '@/assets/icons'
import { Button } from '@/components/button'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'

import s from './recovery-link-expired.module.scss'

export const RecoveryLinkExpired = () => {
  const { t } = useTranslation()

  return (
    <div className={s.root}>
      <div className={s.content}>
        <Typography variant="h1" className={s.title}>
          {t.auth.emailExpired}
        </Typography>
        <Typography variant="regular_text_16" className={s.description}>
          {t.auth.expiredDescription}
        </Typography>
        <Button as="a" variant="link-btn" href={PATH.FORGOT_PASSWORD} className={s.link}>
          {t.auth.resendLink}
        </Button>
      </div>
      <LinkExpiredIcon />
    </div>
  )
}
