import { Button, LanguageSelect, Typography } from '@/components'

import s from './header.module.scss'
import { useRouter } from 'next/router'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks'

type Props = {
  unauthorized?: boolean
}
export const Header = ({ unauthorized }: Props) => {
  const router = useRouter()
  const { t } = useTranslation()
  const logoClickHandler = () => {
    router.push(PATH.HOME)
  }

  return (
    <header className={s.header}>
      <div className={s.content}>
        <div className={s.logoWrapper}>
          <Typography
            as="span"
            onClick={logoClickHandler}
            className={s.logo}
            color="primary"
            variant="large"
          >
            Inctagram
          </Typography>
        </div>
        <div className={s.menuContainer}>
          <LanguageSelect />
        </div>
        {unauthorized && (
          <div className={s.buttons}>
            <Button onClick={() => router.push(PATH.LOGIN)} className={s.btn} variant="link">
              {t.auth.signIn}
            </Button>
            <Button onClick={() => router.push(PATH.REGISTRATION)} variant="primary">
              {t.auth.signUp}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
