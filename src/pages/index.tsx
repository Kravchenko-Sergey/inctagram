import { getMainLayout, HeadMeta } from '@/components'
import { AccountManagement } from '@/components/profile/account-management'

const Home = () => {
  return (
    <>
      <HeadMeta title="Home" />
      <main>
        <AccountManagement />
      </main>
    </>
  )
}

Home.getLayout = getMainLayout
export default Home
