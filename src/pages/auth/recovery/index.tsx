import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useCheckRecoveryCodeMutation } from '@/api/auth-api/auth.api'
import { CreateNewPassword, HeadMeta, RecoveryLinkExpired, getHeaderLayout } from '@/components'
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
          try {
            await checkRecoveryCode({ recoveryCode: query.code })
          } catch (error) {
            console.log('Error occured', error) // TODO display error notification
          }
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

Recovery.getLayout = getHeaderLayout

export default Recovery
