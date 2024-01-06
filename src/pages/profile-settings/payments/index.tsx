import React from 'react'
import { getSettingsTabLayout } from '@/components/layout/settings-tabs-layout/settings-tab-layout'
import { ProfilePayments } from '@/components/profile/profile-payments'

export const Payments = () => {
  return <ProfilePayments />
}

Payments.getLayout = getSettingsTabLayout
export default Payments
