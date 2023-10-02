import { z } from 'zod'

import { LocaleType } from '../../locales/ru'

export const forgotPasswordSchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string()
      .trim()
      .nonempty(t.errors.nonemptyEmail)
      .email(t.errors.regexEmail)
      .default(''),
    recaptcha: z.string().trim(),
  })
}

export type ForgotPasswordSchemaType = z.infer<ReturnType<typeof forgotPasswordSchema>>
