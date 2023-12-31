import { memo } from 'react'

import Image from 'next/image'

import ConfirmImg from '/public/image/confirm-success.png'
import { Button, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks'

import s from './mail-verification-success.module.scss'

export const MailVerificationSuccess = memo(() => {
  const { t } = useTranslation()

  return (
    <div className={s.pageWrapper}>
      <div className={s.itemWrapper}>
        <Typography variant="h1" className={s.title}>
          {t.auth.congratulations}
        </Typography>
        <Typography variant="regular_text_16" className={s.description}>
          {t.auth.emailConfirmed}
        </Typography>
        <Button variant="primary" href={PATH.LOGIN} as="a" className={s.button}>
          <Typography variant="h3" className={s.signin}>
            {t.auth.signIn}
          </Typography>
        </Button>
        <Image src={ConfirmImg} alt="successful signup" className={s.img} />
      </div>
    </div>
  )
})
