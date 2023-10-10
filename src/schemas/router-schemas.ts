import { z } from 'zod'

export const routerGithubSchema = z.object({
  accessToken: z.coerce.string().optional(),
})

export const routerRecoverySchema = z.object({
  code: z.coerce.string().optional(),
  email: z.coerce.string().optional(),
})
