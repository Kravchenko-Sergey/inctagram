import { baseApi } from '@/services'
import {
  GetUserDataResponseType,
  GetUsersFollowersDataRequestType,
  GetUsersFollowersDataResponseType,
  GetUsersRequestType,
} from '@/services/followers/types'

export const followersAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    getUsersBySearch: build.query<any, GetUsersRequestType>({
      // получение юзеров. зачем?
      query: () => {
        return {
          url: `users`,
        }
      },
    }),
    deleteFromFollowers: build.mutation<void, { userId: number }>({
      // удалить из фоловеров
      query: ({ userId }) => {
        return {
          method: 'DELETE',
          url: `users/follower/${userId}`,
        }
      },
    }),
    followUserOrUnfollow: build.mutation<void, { selectedUserId: number }>({
      // создание подписки и второй раз отписка
      query: ({ selectedUserId }) => {
        return {
          url: `users/following`,
          method: 'POST',
          body: selectedUserId,
        }
      },
    }),
    getFollowingUserData: build.query<GetUserDataResponseType, { userName: string }>({
      // получение данных на юзера, на которого ты подписан
      query: ({ userName }) => {
        return {
          url: `users/${userName}`,
        }
      },
    }),

    getUsersFollowersData: build.query<
      GetUsersFollowersDataResponseType,
      GetUsersFollowersDataRequestType
    >({
      // получение данных на юзера, на которого ты подписан
      query: ({ userName, pageSize, pageNumber, cursor, search }) => {
        return {
          url: `users/${userName}/followers`,
          params: { pageSize, pageNumber, cursor, search },
        }
      },
    }),

    getUserFollowersData: build.query<any, GetUsersFollowersDataRequestType>({
      // на кого юзернейм подписан
      query: ({ userName, pageSize, pageNumber, cursor, search }) => {
        return {
          url: `users/${userName}/following`,
          body: { pageSize, pageNumber, cursor, search },
        }
      },
    }),
  }),
})

export const { useGetUsersFollowersDataQuery, useGetUsersBySearchQuery } = followersAPI
