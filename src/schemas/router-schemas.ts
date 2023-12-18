import { z } from 'zod'

export const routerGithubSchema = z.object({
  accessToken: z.coerce.string().optional(),
})

export const routerRecoverySchema = z.object({
  code: z.coerce.string().optional(),
  email: z.coerce.string().optional(),
})

export const routerProfileSchema = z.object({
  id: z.coerce.string().optional(),
})

export const routerProfilePostSchema = z.object({
  id: z.coerce.string().optional(),
  postId: z.coerce.string().optional(),
})
