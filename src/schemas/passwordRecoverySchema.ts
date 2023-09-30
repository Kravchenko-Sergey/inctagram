import { z } from 'zod'

import { LocaleType } from '../../locales/ru'

import { passwordRegex } from '@/consts/regex'

export const passwordRecoverySchema = (t: LocaleType) => {
  return z
    .object({
      new_password: z
        .string()
        .nonempty(t.errors.nonemptyPassword)
        .regex(passwordRegex, t.errors.regexPasswordMustContain)
        .trim()
        .min(6, t.errors.minPassword(6)),
      password_confirmation: z.string().nonempty(t.errors.nonemptyConfirm).trim(),
    })
    .refine(data => data.new_password === data.password_confirmation, {
      message: t.errors.passwordsMustMatch,
      path: ['password_confirmation'],
    })
}

export type passwordRecoverySchemaType = z.infer<typeof passwordRecoverySchema>
