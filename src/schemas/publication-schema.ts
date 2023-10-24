import { z } from 'zod'

import { LocaleType } from 'locales/ru'

export const publicationSchema = (t: LocaleType) => {
  return z.object({
    comment: z.string().trim().nonempty(),
    location: z.string().optional(),
  })
}

export type PublicationSchemaSchemaType = z.infer<ReturnType<typeof publicationSchema>>
