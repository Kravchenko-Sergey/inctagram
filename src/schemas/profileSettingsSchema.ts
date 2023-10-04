import { z } from 'zod'

import { LocaleType } from 'locales/ru'

import { aboutMeRegex, firstNameRegex, lastNameRegex, usernameRegex } from '@/consts/regex'

export const profileSettingsSchema = (t: LocaleType) => {
  return z.object({
    userName: z
      .string()
      .trim()
      .nonempty(t.errors.nonemptyUsername)
      .min(6, t.errors.minUsername(6))
      .max(30, t.errors.maxUsername(30))
      .regex(usernameRegex, t.errors.regexUsername),
    firstName: z
      .string()
      .trim()
      .nonempty(t.errors.nonemptyFirstname)
      .max(50, t.errors.maxFirstname(50))
      .regex(firstNameRegex, t.errors.regexFirstname),
    lastName: z
      .string()
      .trim()
      .nonempty(t.errors.nonemptyLastname)
      .max(50, t.errors.maxLastname(50))
      .regex(lastNameRegex, t.errors.regexLastname),
    /*dateOfBirth: z.string().datetime(),*/
    city: z.string(),
    aboutMe: z
      .string()
      .trim()
      .max(200, t.errors.maxFieldLength(200))
      .regex(aboutMeRegex, t.errors.regexAboutMe)
      .optional(),
  })
}

export type ProfileSettingsFormType = z.infer<ReturnType<typeof profileSettingsSchema>>
