import React, { memo } from 'react'

import s from './policy.module.scss'

import { ArrowLeft } from '@/assets/icons/arrow-left'
import { Button } from '@/components/button'
import { Trans } from '@/components/trans/trans'
import { Typography } from '@/components/typography'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'
import Confirm from '@/pages/auth/registration-confirmation'

const Policy = memo(() => {
  const { t } = useTranslation()

  return (
    <div className={s.wrapper}>
      <Button variant="link" href={PATH.REGISTRATION} as="a" className={s.backButton}>
        <ArrowLeft className={s.buttonIcon} />
        <Typography color="secondary" variant="regular_text_14">
          {t.auth.backToRegistration}
        </Typography>
      </Button>
      <div className={s.text}>
        <Typography variant="h1" className={s.title}>
          {t.auth.privacyPolicyTitle}
        </Typography>

        <Typography as="span" className={s.span} variant="regular_text_14">
          <Trans
            text={t.auth.policy}
            tags={{
              '1': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.policy1}
                </Typography>
              ),
              '2': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.policy2}
                </Typography>
              ),
              '3': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.policy3}
                </Typography>
              ),
              '4': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.policy4}
                </Typography>
              ),
            }}
          />
        </Typography>
      </div>
    </div>
  )
})

export default Policy