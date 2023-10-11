import { useLayoutEffect } from 'react'

import { useVerifyMailMutation } from '@/api/auth-api/auth.api'
import { MailVerificationError, MailVerificationSuccess } from '@/components'
import { routerRecoverySchema } from '@/schemas'
import { useTypedRouter } from '@/hooks'

const Confirm = () => {
  const [verify, { isSuccess }] = useVerifyMailMutation()
  const { query } = useTypedRouter(routerRecoverySchema)

  useLayoutEffect(() => {
    verify({ confirmationCode: query.code as string })
  }, [query.code, verify])

  return (
    <>
      {!isSuccess ? (
        <MailVerificationError email={query.email as string} />
      ) : (
        <MailVerificationSuccess />
      )}
    </>
  )
}

export default Confirm
