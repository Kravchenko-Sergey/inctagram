import React, { memo, useCallback } from 'react'
import s from './account-managenent.module.scss'
import { ControlledRadioButton } from '@/components/ui/controlled/controlled-radio/controlled-radio'
import { Button, Card, Typography } from '@/components'
import { PayPal, Stripe } from '@/assets/icons'
import { useTranslation } from '@/hooks'
import { useForm } from 'react-hook-form'
import { AccountManagementFormType } from '@/schemas/account-management-schema'
import { RegisterError } from '@/types'
import { useCreateSubscriptionsMutation } from '@/services/subscriptions'

export const AccountManagement = memo(() => {
  const [createSubscriptions] = useCreateSubscriptionsMutation()
  const { t } = useTranslation()

  const typeData = [
    { value: 'Personal', title: t.profile.personal },
    { value: 'Business', title: t.profile.business },
  ]
  const costBusiness = [
    { value: '10', title: t.profile.tenPerDay },
    { value: '50', title: t.profile.fiftyPerWeek },
    { value: '100', title: t.profile.hundredPerMonths },
  ]

  const { control, watch, handleSubmit } = useForm<AccountManagementFormType>({
    mode: 'onChange',
    defaultValues: {
      type: typeData[0].value,
      cost: costBusiness[0].value,
    },
  })

  const onSubmit = useCallback(
    async (data: AccountManagementFormType, event: any) => {
      try {
        const body = {
          typeSubscription: {},
          paymentType: event.nativeEvent.submitter.getAttribute('data-type'),
          amount: +data.cost!,
          baseUrl: '',
        }

        await createSubscriptions(body).unwrap()
      } catch (e: unknown) {
        const error = e as RegisterError

        console.log(error)
      }
    },
    [createSubscriptions]
  )

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.subtitle} variant="h3">
          {t.profile.accountType}:
        </Typography>
        <Card style={{ marginBottom: '42px' }} className={s.card}>
          <ControlledRadioButton
            defaultValue={typeData[0].value}
            name={'type'}
            control={control}
            options={typeData}
          />
        </Card>
        {watch('type') !== 'Personal' && (
          <div>
            <Typography className={s.subtitle} variant="h3">
              {t.profile.yourSubscriptionCosts}:
            </Typography>
            <Card style={{ marginBottom: '24px' }} className={s.card}>
              <ControlledRadioButton
                defaultValue={costBusiness[0].value}
                name={'cost'}
                control={control}
                options={costBusiness}
              />
            </Card>
            <div className={s.btnContainer}>
              <Button data-type={'PAYPAL'} type={'submit'} className={s.btn} variant="withIcon">
                <PayPal />
              </Button>
              <Typography variant={'regular_text_14'}>{t.profile.or}</Typography>
              <Button type={'submit'} className={s.btn} variant="withIcon" data-type={'STRIPE'}>
                <Stripe />
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
})
