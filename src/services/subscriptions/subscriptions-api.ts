import { baseApi } from '@/services'
import { CreateSubscriptions } from '@/services/subscriptions/types'

export const subscriptionsAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createSubscriptions: build.mutation<{ url: string }, CreateSubscriptions>({
      query: body => ({
        url: `subscriptions`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateSubscriptionsMutation } = subscriptionsAPI
