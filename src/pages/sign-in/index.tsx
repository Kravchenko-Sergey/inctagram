import { HeadMeta, getHeaderLayout, Login } from '@/components'

import s from './sign-in.module.scss'

const SignIn = () => {
  console.log('SignIn')

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
// SignIn.getLayout = getHeaderNewLayout
export default SignIn
