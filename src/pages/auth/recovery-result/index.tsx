import React from 'react'

import { HeadMeta } from '@/components/head-meta'
import PasswordRecoveryResultPageComponent from '@/components/password-recovery-result/password-recovery-result'

const RecoveryResult = () => {
  return (
    <>
      <HeadMeta title="Password recovery" />
      <main>
        <PasswordRecoveryResultPageComponent />
      </main>
    </>
  )
}

export default RecoveryResult
