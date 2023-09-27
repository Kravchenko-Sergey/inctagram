import React, { memo } from 'react'

import s from './password-recovery-result.module.scss'

import { LinkExpiredIcon } from '@/assets/icons/link-expired'
import { Button } from '@/components/button'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'

const PasswordRecoveryResultPageComponent = memo(() => {
  const { t } = useTranslation()

  return (
    <div className={s.root}>
      <div className={s.content}>
        <Typography variant={'h1'} className={s.title}>
          {t.auth.emailExpired}
        </Typography>
        <Typography variant={'regular_text_16'} className={s.description}>
          {t.auth.expiredDescription}
        </Typography>
        <Button variant="link-btn" href={PATH.FORGOT_PASSWORD} fullWidth={true}>
          {t.auth.resendLink}
        </Button>
      </div>
      <LinkExpiredIcon />
    </div>
  )
})

export default PasswordRecoveryResultPageComponent
