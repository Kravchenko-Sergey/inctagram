import React, { memo } from 'react'

import s from './password-recovery-result.module.scss'

import { LinkExpiredIcon } from '@/assets/icons/link-expired'
import { Button } from '@/components/button'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'

const PasswordRecoveryResultPageComponent = memo(() => {
  return (
    <div className={s.root}>
      <div className={s.content}>
        <Typography variant={'h1'} className={s.title}>
          Email verification link expired
        </Typography>
        <Typography variant={'regular_text_16'} className={s.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
        <Button variant="link-btn" href={PATH.FORGOT_PASSWORD} fullWidth={true}>
          Resend Link
        </Button>
      </div>
      <LinkExpiredIcon />
    </div>
  )
})

export default PasswordRecoveryResultPageComponent
