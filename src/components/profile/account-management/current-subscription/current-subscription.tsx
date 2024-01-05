import React from 'react'
import { Card, Checkbox, Typography } from '@/components'
import { useTranslation } from '@/hooks'
import s from './current-subscription.module.scss'
import { useCurrentSubscriptionsQuery } from '@/services/subscriptions'
import { format } from 'date-fns'

export const CurrentSubscription = () => {
  const { t } = useTranslation()
  const { data } = useCurrentSubscriptionsQuery()

  // console.log(
  //   'data',
  //   data?.data.map(item => console.log('value', new Date(item.endDateOfSubscription)))
  // )
  const isEmptySubscription = data?.data.length === 0

  let dateNextPayment
  let expireAtDate

  if (data) {
    let expireDataForFormat = data?.data[0].dateOfPayment
    let paymentDataForFormat = data?.data[data.data.length - 1].endDateOfSubscription

    expireAtDate = format(new Date(expireDataForFormat), 'dd.MM.yyyy')
    dateNextPayment = format(new Date(paymentDataForFormat), 'dd.MM.yyyy')
  }

  return (
    <div className={s.container}>
      <Typography variant="h3">{t.profile.currentSubscriptions}</Typography>
      <Card className={s.cardContainer}>
        {isEmptySubscription}
        <div className={s.dateContainer}>
          <p className={s.dateTitle}>{t.profile.expireAt}</p>
          <p>{expireAtDate}</p>
        </div>
        <div className={s.dateContainer}>
          <p className={s.dateTitle}>{t.profile.nextPayment}</p>
          <p>{dateNextPayment}</p>
        </div>
      </Card>

      <Checkbox className={s.checkBox} label={'Auto-Renewal'} checked={data?.hasAutoRenewal} />
    </div>
  )
}
