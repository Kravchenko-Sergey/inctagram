import { z } from 'zod'
import { LocaleType } from 'locales/ru'

export function descriptionSchema(t: LocaleType) {
  return z.object({
    description: z.string().max(500, t.errors.maxLengthPost),
  })
}

export type DescriptionFormType = {
  description: string
}
