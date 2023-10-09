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
    dateOfBirth: z.date().refine(
      data => {
        const dob = new Date(data)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()

        return age >= 13
      },
      {
        message: t.errors.under13,
      }
    ),
    city: z.string().trim().nonempty(),
    aboutMe: z
      .string()
      .trim()
      .max(200, t.errors.maxFieldLength(200))
      .regex(aboutMeRegex, t.errors.regexAboutMe)
      .nonempty(),
  })
}

export type ProfileSettingsFormType = z.infer<ReturnType<typeof profileSettingsSchema>>
