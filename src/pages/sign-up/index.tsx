import React from 'react'

import s from './sign-up.module.scss'

import { GitHubIcon } from '@/assets/icons/github-icon'
import { HeadMeta } from '@/components/head-meta'
import { Registration } from '@/components/registration/registration'

const SignUp = () => {
  return (
    <div className={s.pageWrapper}>
      <HeadMeta title={'Registration'} />
      <Registration />
    </div>
  )
}

export default SignUp
