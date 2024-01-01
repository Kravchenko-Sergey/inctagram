export type CreateSubscriptions = {
  typeSubscription: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
  amount: number
  baseUrl: string
}

export type CurrentSubscriptions ={
  "userId": number,
  "subscriptionId": string,
  "dateOfPayment": string,
  "endDateOfSubscription": string,
  "autoRenewal": boolean
}
