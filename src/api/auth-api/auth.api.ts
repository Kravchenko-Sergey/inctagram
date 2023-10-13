import {
  GoogleLoginType,
  LoginFormType,
  LoginType,
  RecoverPasswordType,
  RegistrationResendEmailType,
  RegistrationType,
  UserType,
} from './types'

import { instagramAPI } from '@/api'

export const authAPI = instagramAPI.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginType, LoginFormType>({
      query: body => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
    }),
    registration: build.mutation<void, RegistrationType>({
      query: body => ({
        url: `auth/registration`,
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => {
        return {
          method: 'POST',
          url: 'auth/logout',
          credentials: 'include',
        }
      },
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        // const state = getState() as RootState

        // const { nameToSearch, sort, page, pageSize, range, authorId } = state.decksReducer

        try {
          await queryFulfilled

          dispatch(
            authAPI.util.updateQueryData('me', undefined, () => {
              return {} as UserType
            })
          )

          // dispatch(instagramAPI.util.resetApiState())
          // dispatch(authAPI.util.updateQueryData("getProfile", { "profileId" }, () => {
          // }));

          // dispatch(
          //   decksAPI.util.updateQueryData(
          //     'getDecks',
          //     {
          //       minCardsCount: range[0].toString(),
          //       maxCardsCount: range[1].toString(),
          //       orderBy: sort ? `${sort['key']}-${sort['direction']}` : '',
          //       name: nameToSearch,
          //       currentPage: page.toString(),
          //       itemsPerPage: pageSize,
          //       authorId,
          //     },
          //     draft => {
          //       draft.items.pop()
          //       draft.items.unshift(res.data)
          //     }
          //   )
          // )
        } catch {
          // patchResult.undo()
          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    verifyMail: build.mutation<void, { confirmationCode: string }>({
      query: (body: { confirmationCode: string }) => ({
        url: `auth/registration-confirmation`,
        method: 'POST',
        body,
      }),
    }),
    resendEmail: build.mutation<void, RegistrationResendEmailType>({
      query: body => ({
        url: `auth/registration-email-resending`,
        method: 'POST',
        body,
      }),
    }),
    recoverPassword: build.mutation<void, RecoverPasswordType>({
      query: body => ({
        url: `auth/password-recovery`,
        method: 'POST',
        body,
      }),
    }),
    me: build.query<UserType, void>({
      query: () => ({
        url: '/auth/me',
      }),
    }),
    checkRecoveryCode: build.mutation<{ email: string }, { recoveryCode: string }>({
      query: (body: { recoveryCode: string }) => ({
        url: `auth/check-recovery-code`,
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: build.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: (body: { newPassword: string; recoveryCode: string }) => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
    updateToken: build.query<{ accessToken: string }, void>({
      query: () => ({
        url: '/auth/update-tokens',
      }),
    }),
    googleLogin: build.mutation<GoogleLoginType, { code: string }>({
      query: body => ({
        url: '/auth/google/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useLazyMeQuery,
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
  useRegistrationMutation,
  useVerifyMailMutation,
  useResendEmailMutation,
  useRecoverPasswordMutation,
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
} = authAPI
