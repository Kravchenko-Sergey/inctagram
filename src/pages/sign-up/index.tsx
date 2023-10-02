import React from 'react'

import s from './sign-up.module.scss'

import { HeadMeta } from '@/components/head-meta'
import { getHeaderLayout } from '@/components/layout/header-layout/header-layout'
import { Registration } from '@/components/registration/registration'

const SignUp = () => {
  return (
    <div className={s.pageWrapper}>
      <HeadMeta title={'Registration'} />
      <div className={s.wrapper}>
        <Registration />
      </div>
    </div>
  )
}

SignUp.getLayout = getHeaderLayout

export default SignUp
