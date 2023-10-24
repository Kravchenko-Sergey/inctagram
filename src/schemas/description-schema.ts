import { z } from 'zod'
import { LocaleType } from '../../locales/ru'

export function descriptionSchema(t: LocaleType) {
  return z.object({
    description: z.string().max(500, 'Max 500 simbols'),
  })
}

export type DescriptionFormType = {
  description: string
}
