import { ForgotPasswordForm, HeadMeta, getHeaderLayout } from '@/components'

const ForgotPassword = () => {
  return (
    <>
      <HeadMeta title="Forgot password" />
      <main>
        <ForgotPasswordForm />
      </main>
    </>
  )
}

ForgotPassword.getLayout = getHeaderLayout

export default ForgotPassword
