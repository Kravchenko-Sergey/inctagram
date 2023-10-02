import s from './header.module.scss'

import { LanguageSelect } from '@/components/language-select'
import { Typography } from '@/components/typography'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.content}>
        <Typography color="primary" variant="large">
          Inctagram
        </Typography>
        <div className={s.menuContainer}>
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
}
