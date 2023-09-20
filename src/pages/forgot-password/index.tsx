import React from 'react'

import { HeadMeta } from '@/components/head-meta'
import ForgotPasswordPageComponent from '@/page-components/forgot-password/forgot-password'

const ForgotPassword = () => {
  return (
    <>
      <HeadMeta title="Forgot password" />
      <main>
        <ForgotPasswordPageComponent></ForgotPasswordPageComponent>
      </main>
    </>
  )
}

export default ForgotPassword
