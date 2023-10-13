import { LanguageSelect, Typography } from '@/components'

import s from './header.module.scss'

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
