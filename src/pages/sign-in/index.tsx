import { HeadMeta, getHeaderLayout, Login } from '@/components'

import s from './sign-in.module.scss'

const SignIn = () => {
  return (
    <div className={s.root}>
      <HeadMeta title="Sign-in" />
      <main>
        <Login />
      </main>
    </div>
  )
}

SignIn.getLayout = getHeaderLayout
export default SignIn
