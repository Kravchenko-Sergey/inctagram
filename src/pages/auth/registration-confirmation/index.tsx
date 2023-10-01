import { useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

import { useVerifyMailMutation } from '@/api/auth-api/auth.api'
import { MailVerificationError } from '@/components/mail-verification-error'
import { MailVerificationSuccess } from '@/components/mail-verification-success'

const Confirm = () => {
  const [verify, { isSuccess }] = useVerifyMailMutation()
  const { query } = useRouter()

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
