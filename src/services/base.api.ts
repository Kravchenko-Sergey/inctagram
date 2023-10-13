import { baseQueryWithReauth } from '@/services'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['getProfile'],
  endpoints: () => ({}),
})
