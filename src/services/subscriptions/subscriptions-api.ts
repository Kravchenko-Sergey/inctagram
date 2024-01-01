import { baseApi } from '@/services'
import {CreateSubscriptions, CurrentSubscriptions} from '@/services/subscriptions/types'

export const subscriptionsAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    createSubscriptions: build.mutation<{ url: string }, CreateSubscriptions>({
      query: body => ({
        url: `subscriptions`,
        method: 'POST',
        body,
      }),
    }),
    currentSubscriptions:build.query<void,CurrentSubscriptions[]>({
      query:()=>({
        url: 'current-subscriptions',
        method:'GET',
      })
    })
  }),
})

export const { useCreateSubscriptionsMutation } = subscriptionsAPI
