import { baseApi } from '@/services'
import {
  CreateSubscriptions,
  CurrentSubscriptions,
  MySubscriptionResponseType,
} from '@/services/subscriptions/types'

export const subscriptionsAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createSubscriptions: build.mutation<{ url: string }, CreateSubscriptions>({
      query: body => ({
        url: `subscriptions`,
        method: 'POST',
        body,
      }),
    }),
    currentSubscriptions: build.query<CurrentSubscriptions, void>({
      query: () => ({
        url: 'subscriptions/current-subscriptions',
        method: 'GET',
      }),
    }),
    mySubscriptions: build.query<MySubscriptionResponseType, void>({
      query: () => ({
        url: 'subscriptions/my-payments',
      }),
    }),
  }),
})

export const {
  useCreateSubscriptionsMutation,
  useMySubscriptionsQuery,
  useCurrentSubscriptionsQuery,
} = subscriptionsAPI
