import { z } from 'zod'

export const publicationSchema = () => {
  return z.object({
    comment: z.string().trim().nonempty(),
    location: z.string().optional(),
  })
}

export type PublicationSchemaSchemaType = z.infer<ReturnType<typeof publicationSchema>>
