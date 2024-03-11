import React from 'react'
import { Button, Trans, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { ArrowLeft } from '@/assets/icons'
import { useTranslation } from '@/hooks'
import s from './policy.module.scss'

export const Policy = () => {
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
          {t.auth.termsOfService}
        </Typography>

        <Typography className={s.span} as="span" variant="regular_text_14">
          <Trans
            text={t.auth.terms}
            tags={{
              '1': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.terms1}
                </Typography>
              ),
              '2': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.terms2}
                </Typography>
              ),
              '3': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.terms3}
                </Typography>
              ),
              '4': () => (
                <Typography variant="regular_text_14" color="inherit" as="p">
                  {t.auth.terms4}
                </Typography>
              ),
            }}
          />
        </Typography>
      </div>
    </div>
  )
}
