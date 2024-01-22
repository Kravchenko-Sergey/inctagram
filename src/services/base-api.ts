import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/services/base-api-with-reauth'
import { HYDRATE } from 'next-redux-wrapper'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [
    'getProfile',
    'getUserPosts',
    'post',
    'getUserPostsData',
    'getProfileData',
    'getAllUserSessions',
  ],
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
})
