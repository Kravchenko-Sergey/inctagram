import React from 'react'

import { HeadMeta } from '@/components/head-meta'
import PasswordRecoveryPageComponent from '@/components/password-recovery/password-recovery'

const PasswordRecovery = () => {
  return (
    <>
      <HeadMeta title="Password recovery" />
      <main>
        <PasswordRecoveryPageComponent />
      </main>
    </>
  )
}

export default PasswordRecovery
