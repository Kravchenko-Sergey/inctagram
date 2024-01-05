import { getSettingsTabLayout } from '@/components/layout/settings-tabs-layout/settings-tab-layout'
import { AccountManagement } from '@/components/profile/account-management'

const Account = () => {
  return <AccountManagement />
}

Account.getLayout = getSettingsTabLayout
export default Account
