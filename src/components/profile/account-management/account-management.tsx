import React, { memo } from 'react'
import s from './account-managenent.module.scss'
import { useCurrentSubscriptionsQuery } from '@/services/subscriptions'
import { CurrentSubscription } from '@/components/profile/account-management/current-subscription/current-subscription'
import { CreateSubscription } from '@/components/profile/account-management/createSubscription'

export const AccountManagement = memo(() => {
  const { data: currentSubscription } = useCurrentSubscriptionsQuery()
  const isEmptySubscription = currentSubscription?.data.length === 0

  return (
    <div className={s.root}>
      {!isEmptySubscription && <CurrentSubscription />}
      <CreateSubscription />
    </div>
  )
})
