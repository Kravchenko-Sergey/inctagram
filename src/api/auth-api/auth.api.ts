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
    githubLogin: build.query<void, void>({
      query: () => ({
        url: 'auth/github/login',
      }),
    }),
  }),
})

export const {
  useMeQuery,
  useLogoutMutation,
  useLazyGithubLoginQuery,
  useGoogleLoginMutation,
  useRegistrationMutation,
  useVerifyMailMutation,
  useResendEmailMutation,
  useRecoverPasswordMutation,
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
} = authAPI
