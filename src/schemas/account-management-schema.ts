import { z } from 'zod'

import { LocaleType } from 'locales/ru'

export const accountManagementSchema = (t: LocaleType) => {
  return z.object({
    type: z.string(),
    cost: z.nullable(z.string()),
  })
}

export type AccountManagementFormType = z.infer<ReturnType<typeof accountManagementSchema>>
