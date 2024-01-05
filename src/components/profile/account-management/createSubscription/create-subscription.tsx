import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Modal, Typography } from '@/components'
import { ControlledRadioButton } from '@/components/ui/controlled/controlled-radio/controlled-radio'
import { PayPal, Stripe } from '@/assets/icons'
import s from './create-subscription.module.scss'
import { AccountManagementFormType } from '@/schemas/account-management-schema'
import { useTranslation } from '@/hooks'
import { useForm } from 'react-hook-form'
import { RegisterError } from '@/types'
import { PATH } from '@/consts/route-paths'
import { useCreateSubscriptionsMutation, useMySubscriptionsQuery } from '@/services/subscriptions'
import { useRouter } from 'next/router'

export const CreateSubscription = () => {
  const { t } = useTranslation()
  const [errorType, setErrorType] = useState<string | null>(null)
  const [createSubscriptions] = useCreateSubscriptionsMutation()
  const { data } = useMySubscriptionsQuery()

  const { query, push } = useRouter()

  const typeData = [
    { value: 'Personal', title: t.profile.personal },
    { value: 'Business', title: t.profile.business },
  ]
  const costBusiness = [
    { value: '10', title: t.profile.tenPerDay },
    { value: '50', title: t.profile.fiftyPerWeek },
    { value: '100', title: t.profile.hundredPerMonths },
  ]
  const { control, watch, setValue, handleSubmit } = useForm<AccountManagementFormType>({
    mode: 'onChange',
    defaultValues: {
      type: typeData[0].value,
      cost: costBusiness[0].value,
    },
  })

  useEffect(() => {
    if (query.success) {
      setErrorType('success')
    }
    if (query.error) {
      setErrorType('error')
    }
  }, [query.success, query])

  const onSubmit = useCallback(
    async (data: AccountManagementFormType, event: any) => {
      let duration: 'MONTHLY' | 'DAY' | 'WEEKLY'

      switch (+data.cost!) {
        case 10:
          duration = 'DAY'
          break
        case 50:
          duration = 'WEEKLY'
          break
        default:
          duration = 'MONTHLY'
          break
      }

      try {
        const body = {
          typeSubscription: duration,
          paymentType: event.nativeEvent.submitter.getAttribute('data-type'),
          amount: +data.cost!,
          baseUrl: 'http://localhost:3000/profile-settings/',
        }

        const res = await createSubscriptions(body).unwrap()

        push(res.url)
      } catch (e: unknown) {
        const error = e as RegisterError

        console.log(error)
      }
    },
    [createSubscriptions, push]
  )

  useEffect(() => {
    if (errorType && data) {
      console.log('value')
      console.log('data', data)
      setValue('cost', data[0].price.toString())
      setValue('type', 'Business')
    }
  }, [data, errorType, setValue])

  const handleModalClosed = () => {
    setErrorType(null)
    push(PATH.PROFILE_SETTINGS)
  }

  return (
    <div className={s.root}>
      <Modal
        className={s.modalRoot}
        onOpenChange={handleModalClosed}
        isOpen={errorType === 'success' || errorType === 'error'}
        title={errorType === 'success' ? t.profile.success : t.profile.error}
      >
        <div>
          <Typography className={s.modalSubtitle} variant="regular_text_16">
            {errorType === 'success' ? t.profile.paymentSuccessful : t.profile.transactionFailed}
          </Typography>
          <Button onClick={handleModalClosed} variant="primary" fullWidth>
            {errorType === 'success' ? t.ok : t.profile.backToPayment}
          </Button>
        </div>
      </Modal>

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
}
