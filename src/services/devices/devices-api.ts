import { baseApi } from '@/services'
import { UserDevice } from '@/services/devices/types'

export const devicesAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllUserSessions: build.query<UserDevice[], void>({
      query: () => {
        return {
          url: `sessions`,
        }
      },
      providesTags: ['getAllUserSessions'],
    }),
    deleteAllSessions: build.mutation<void, void>({
      query: () => {
        return {
          url: `sessions/terminate-all`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['getAllUserSessions'],
    }),
    deleteSessionsById: build.mutation<void, { deviceId: number }>({
      query: ({ deviceId }) => {
        return {
          url: `sessions/${deviceId}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['getAllUserSessions'],
    }),
  }),
})

export const {
  useDeleteSessionsByIdMutation,
  useDeleteAllSessionsMutation,
  useGetAllUserSessionsQuery,
} = devicesAPI
