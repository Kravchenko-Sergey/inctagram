import { z } from 'zod'

import { LocaleType } from 'locales/ru'

import { passwordRegex } from '@/consts/regex'

export const loginSchema = (t: LocaleType) => {
  return z.object({
    email: z.string().trim().nonempty(t.errors.nonemptyEmail).email(t.errors.regexEmail),
    password: z
      .string()
      .nonempty(t.errors.nonemptyPassword)
      .regex(passwordRegex, t.errors.regexPasswordMustContain)
      .trim()
      .min(6, t.errors.minPassword(6)),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>
