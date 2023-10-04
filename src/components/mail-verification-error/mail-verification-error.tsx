import { memo } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { baseUrl } from '@/api'
import { useResendEmailMutation } from '@/api/auth-api/auth.api'
import ConfirmImg from '@/assets/image/confirm-error.png'
import { Button, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'

import s from './mail-verification-error.module.scss'

type MailVerificationErrorProps = {
  email: string
}

export const MailVerificationError = memo(({ email }: MailVerificationErrorProps) => {
  const { t } = useTranslation()
  const [resendEmail] = useResendEmailMutation()
  const { push } = useRouter()

  const buttonHandler = async () => {
    try {
      await resendEmail({ baseUrl: baseUrl, email })
      push(PATH.LOGIN)
    } catch (error) {
      // TODO handle error
      console.error(error)
    }
  }

  return (
    <div className={s.pageWrapper}>
      <div className={s.itemWrapper}>
        <Typography variant="h1" className={s.title}>
          {t.auth.emailExpired}
        </Typography>
        <Typography variant="regular_text_16" className={s.description}>
          {t.auth.expiredDescription}
        </Typography>
        <Button variant="primary" onClick={buttonHandler} className={s.button}>
          <Typography variant="h3" className={s.signin}>
            {t.auth.resendLink}
          </Typography>
        </Button>
        <Image src={ConfirmImg} alt="error signup" className={s.img} />
      </div>
    </div>
  )
})
