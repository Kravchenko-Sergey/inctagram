// pages

export const PATH = {
  HOME: '/',
  CREATE: '/create',
  PROFILE: '/profile',
  PROFILE_SETTINGS: '/profile-settings',
  PUBLIC_PROFILE: '/profile/:id',
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
}

export const commonRoutes = [
  PATH.LOGIN,
  PATH.REGISTRATION,
  PATH.GITHUB,
  PATH.FORGOT_PASSWORD,
  PATH.CONFIRM,
  PATH.POLICY,
  PATH.LOGOUT,
  PATH.SERVICE,
  PATH.RECOVERY_PASSWORD,
  PATH.PUBLIC_PROFILE,
]
