export type CreateSubscriptions = {
  typeSubscription: 'MONTHLY' | 'DAY' | 'WEEKLY'
  paymentType: 'STRIPE' | 'PAYPAL'
  amount: number
  baseUrl: string
}

export type CurrentSubscriptions ={
 data:[{
   "userId": number,
   "subscriptionId": string,
   "dateOfPayment": Date,
   "endDateOfSubscription": Date,
   "autoRenewal": boolean
 }]
}
