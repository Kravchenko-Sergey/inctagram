import { z } from 'zod'

import { LocaleType } from '../../locales/ru'

export const profileSettingsSchema = (t: LocaleType) => {
  return z.object({
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
}

export type ProfileSettingsFormValues = z.infer<ReturnType<typeof profileSettingsSchema>>
