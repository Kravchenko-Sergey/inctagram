import { baseApi } from '@/services'
import { CreateSubscriptions } from '@/services/subscriptions/types'

export const subscriptionsAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createSubscriptions: build.mutation<{ url: string }, CreateSubscriptions>({
      query: () => ({
        url: `subscriptions`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useCreateSubscriptionsMutation } = subscriptionsAPI
