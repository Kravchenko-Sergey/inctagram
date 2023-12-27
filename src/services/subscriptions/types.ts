export type CreateSubscriptions = {
  typeSubscription: {}
  paymentType: 'STRIPE' | 'PAYPAL'
  amount: number
  baseUrl: string
}
