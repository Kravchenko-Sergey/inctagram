import { z } from 'zod'

import { passwordRegex } from '@/consts/regex'
import { LocaleType } from 'locales/ru'

export const passwordRecoverySchema = (t: LocaleType) => {
  return z
    .object({
      newPassword: z
        .string()
        .nonempty(t.errors.nonemptyPassword)
        .regex(passwordRegex, t.errors.regexPasswordMustContain)
        .trim()
        .min(6, t.errors.minPassword(6)),
      passwordConfirmation: z.string().nonempty(t.errors.nonemptyConfirm).trim(),
    })
    .refine(data => data.newPassword === data.passwordConfirmation, {
      message: t.errors.passwordsMustMatch,
      path: ['passwordConfirmation'],
    })
}

export type PasswordRecoveryFormType = z.infer<ReturnType<typeof passwordRecoverySchema>>
