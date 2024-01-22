// pages

export const PATH = {
  HOME: '/',
  CREATE: '/create',
  PROFILE: '/profile',
  PROFILE_ACCOUNT: '/profile-settings/account',
  PROFILE_GENERAL: '/profile-settings/general',
  PROFILE_DEVICE: '/profile-settings/device',
  PROFILE_PAYMENTS: '/profile-settings/payments',

  PROFILE_SETTINGS: '/profile-settings',
  MESSENGER: '/messenger',
  SEARCH: '/search',
  STATISTIC: '/statistics',
  REGISTRATION: '/sign-up',
  LOGIN: '/sign-in',
  FAVORITES: '/favorites',
  FORGOT_PASSWORD: '/auth/forgot-password',
  LOGOUT: '/logout',
  POLICY: '/auth/policy',
  SERVICE: '/auth/terms',
  CONFIRM: '/auth/registration-confirmation',
  GITHUB: '/github',
  RECOVERY_PASSWORD: '/auth/recovery',
  MAIN: '/main',
}

export const commonRoutes = [
  PATH.PROFILE,
  PATH.LOGIN,
  PATH.REGISTRATION,
  PATH.GITHUB,
  PATH.FORGOT_PASSWORD,
  PATH.CONFIRM,
  PATH.POLICY,
  PATH.LOGOUT,
  PATH.SERVICE,
  PATH.RECOVERY_PASSWORD,
  PATH.MAIN,
]
