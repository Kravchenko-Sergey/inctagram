export type CreateSubscriptions = {
  typeSubscription: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
  amount: number
  baseUrl: string
}

type SubscriptionType = {
  userId: number
  subscriptionId: string
  dateOfPayment: any
  endDateOfSubscription: any
  autoRenewal: boolean
}

export type CurrentSubscriptions = {
  data: SubscriptionType[]
  hasAutoRenewal: boolean
}

export type Payment = {
  userId: number
  subscriptionId: string
  dateOfPayment: any
  endDateOfSubscription: any
  price: number
  subscriptionType: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
}
