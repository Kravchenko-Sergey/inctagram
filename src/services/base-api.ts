import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/services/base-api-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['getProfile'],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
