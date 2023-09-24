export type LoginFormType = {
  email: string
  password: string
}

export type LoginType = {
  accessToken?: string
}

export type RegistrationType = {
  userName: string
  email: string
  password: string
}

export type RegistrationResendEmailType = {
  email: string
  baseUrl: string
}

export type RecoverPasswordType = {
  email: string
  recaptcha: string
}
export type UserType = {
  userId: number
  userName: string
  email: string
}

export type GoogleLoginType = {
  accessToken?: string
}
