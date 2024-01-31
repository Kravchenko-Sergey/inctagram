import { z } from 'zod'

export const postItemSchema = () => {
  return z.object({
    comment: z.string().optional(),
  })
}

export type PostItemFormType = z.infer<ReturnType<typeof postItemSchema>>
