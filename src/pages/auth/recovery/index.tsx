import { useEffect } from 'react'
import { useCheckRecoveryCodeMutation } from '@/services/auth/auth-api'
import { CreateNewPassword, HeadMeta, RecoveryLinkExpired, getHeaderLayout } from '@/components'
import { useTypedRouter } from '@/hooks'
import { routerRecoverySchema } from '@/schemas'
import { Loader } from 'src/components/ui/loader'
import { toast } from 'react-toastify'

const Recovery = () => {
  const { query, isReady } = useTypedRouter(routerRecoverySchema)
  const [checkRecoveryCode, { isLoading, data, isError, isUninitialized }] =
    useCheckRecoveryCodeMutation()

  useEffect(() => {
    const fetch = async (code: string) => {
      try {
        await checkRecoveryCode({ recoveryCode: code })
      } catch (error) {
        toast.error(`Error occured, ${error}`, { icon: false })
      }
    }

    if (isReady && query.code) {
      fetch(query.code)
    }
  }, [checkRecoveryCode, isReady, query.code])
  if (isLoading || !isReady || isUninitialized) {
    return <Loader />
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
