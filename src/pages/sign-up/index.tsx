import { HeadMeta, Registration, getHeaderLayout } from '@/components'

import s from './sign-up.module.scss'

const SignUp = () => {
  return (
    <div className={s.pageWrapper}>
      <HeadMeta title="Registration" />
      <div className={s.wrapper}>
        <Registration />
      </div>
    </div>
  )
}

SignUp.getLayout = getHeaderLayout

export default SignUp
