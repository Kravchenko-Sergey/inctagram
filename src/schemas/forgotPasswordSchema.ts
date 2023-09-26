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
  })
}

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>
