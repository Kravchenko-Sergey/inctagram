export type CreateSubscriptions = {
  typeSubscription: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
  amount: number
  baseUrl: string
}

type SubscriptionType = {
  userId: number
  subscriptionId: string
  dateOfPayment: Date
  endDateOfSubscription: Date
  autoRenewal: boolean
}

export type CurrentSubscriptions = {
  data: SubscriptionType[]
  hasAutoRenewal: boolean
}

type MySubscriptionType = {
  userId: number
  subscriptionId: string
  dateOfPayment: Date
  endDateOfSubscription: Date
  price: number
  subscriptionType: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
}
export type MySubscriptionResponseType = MySubscriptionType[]
