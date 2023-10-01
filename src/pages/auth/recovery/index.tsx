import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useCheckRecoveryCodeMutation } from '@/api/auth-api/auth.api'
import { CreateNewPassword } from '@/components/create-new-password'
import { HeadMeta } from '@/components/head-meta'
import { RecoveryLinkExpired } from '@/components/recovery-link-expired'
import { checkValidQuery } from '@/helpers/checkValidQuery'

type ExpectedQuery = {
  code: string
  email: string
}

const Recovery = () => {
  const { query, isReady } = useRouter()
  const [checkRecoveryCode, { isLoading, data, isError, isUninitialized }] =
    useCheckRecoveryCodeMutation()

  const isValidQuery = checkValidQuery<ExpectedQuery>(query)

  useEffect(() => {
    const fetch = async () => {
      if (isValidQuery) {
        if (isReady && isValidQuery) {
          await checkRecoveryCode({ recoveryCode: query.code })
        }
      }
    }

    fetch()
  }, [checkRecoveryCode, isReady, isValidQuery, query.code])

  if (isLoading || !isReady || isUninitialized) {
    // TODO Replace with custom loader
    return <div>Loading...</div>
  }

  if (!isValidQuery || isError || (data && data.email !== query.email)) {
    return <RecoveryLinkExpired />
  }

  return (
    <>
      <HeadMeta title="Password recovery" />
      <main>
        <CreateNewPassword code={query.code} />
      </main>
    </>
  )
}

export default Recovery
