import { z } from 'zod'

import { LocaleType } from '../../locales/ru'

import { passwordRegex, usernameRegex } from '@/consts/regex'

export const createRegisterSchema = (t: LocaleType) => {
  return z
    .object({
      username: z
        .string()
        .trim()
        .nonempty(t.errors.nonemptyUsername)
        .min(6, t.errors.minUsername(6))
        .max(30, t.errors.maxUsername(30))
        .regex(usernameRegex, t.errors.regexUsername),
      email: z.string().trim().nonempty(t.errors.nonemptyEmail).email(t.errors.regexEmail),
      password: z
        .string()
        .nonempty(t.errors.nonemptyPassword)
        .regex(passwordRegex, t.errors.regexPasswordMustContain)
        .trim()
        .min(6, t.errors.minPassword(6)),
      confirm: z
        .string()
        .nonempty(t.errors.nonemptyPassword)
        .regex(passwordRegex, t.errors.regexPasswordMustContain)
        .trim()
        .min(6, t.errors.minPassword(6)),
      read: z.boolean(),
    })
    .refine(data => data.password === data.confirm, {
      message: t.errors.passwordsMustMatch,
      path: ['confirm'],
    })
    .superRefine((data, ctx) => {
      if (!data.read) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t.errors.requiredTerms,
          path: ['read'],
        })
      }
    })
}

export type RegisterFormType = z.infer<ReturnType<typeof createRegisterSchema>>
