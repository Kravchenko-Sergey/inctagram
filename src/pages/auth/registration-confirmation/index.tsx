import { useEffect } from 'react'
import { useVerifyMailMutation } from '@/services/auth/auth-api'
import {
  HeadMeta,
  Loader,
  MailVerificationError,
  MailVerificationSuccess,
  getHeaderLayout,
} from '@/components'
import { routerRecoverySchema } from '@/schemas'
import { useTypedRouter } from '@/hooks'

const Confirm = () => {
  const [verify, { isSuccess, isLoading, isUninitialized }] = useVerifyMailMutation()
  const { query, isReady } = useTypedRouter(routerRecoverySchema)

  useEffect(() => {
    const fetch = async () => await verify({ confirmationCode: query.code as string })

    if (isReady) {
      fetch()
    }
  }, [isReady, query.code, verify])
  if (isLoading || !isReady || isUninitialized) {
    return <Loader />
  }

  return (
    <>
      <HeadMeta title="Email confimation" />
      <main>
        <>
          {!isSuccess ? (
            <MailVerificationError email={query.email as string} />
          ) : (
            <MailVerificationSuccess />
          )}
        </>
      </main>
    </>
  )
}

Confirm.getLayout = getHeaderLayout
export default Confirm
