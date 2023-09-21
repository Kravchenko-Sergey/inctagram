import React from 'react'

import ForgotPasswordPageComponent from '@/components/forgot-password/forgot-password'
import { HeadMeta } from '@/components/head-meta'

const ForgotPassword = () => {
  return (
    <>
      <HeadMeta title="Forgot password" />
      <main>
        <ForgotPasswordPageComponent />
      </main>
    </>
  )
}

export default ForgotPassword
