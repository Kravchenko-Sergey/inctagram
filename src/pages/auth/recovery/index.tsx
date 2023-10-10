import { useEffect } from 'react'

import { useCheckRecoveryCodeMutation } from '@/api/auth-api/auth.api'
import { CreateNewPassword, HeadMeta, RecoveryLinkExpired, getHeaderLayout } from '@/components'
import { useTypedRouter } from '@/hooks'
import { routerRecoverySchema } from '@/schemas'

const Recovery = () => {
  const { query, isReady } = useTypedRouter(routerRecoverySchema)
  const [checkRecoveryCode, { isLoading, data, isError, isUninitialized }] =
    useCheckRecoveryCodeMutation()

  useEffect(() => {
    const fetch = async () => {
      if (isReady && query.code) {
        try {
          await checkRecoveryCode({ recoveryCode: query.code })
        } catch (error) {
          console.log('Error occured', error) // TODO display error notification
        }
      }
    }

    fetch()
  }, [checkRecoveryCode, isReady, query])

  if (isLoading || !isReady || isUninitialized) {
    // TODO Replace with custom loader
    return <div>Loading...</div>
  }

  if (!query.code || isError || (data && data.email !== query.email)) {
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
