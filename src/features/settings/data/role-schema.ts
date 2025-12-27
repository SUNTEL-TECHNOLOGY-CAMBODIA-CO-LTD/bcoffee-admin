import { z } from 'zod'

export const permissionSchema = z.object({
  id: z.string(),
  label: z.string(),
  group: z.string(),
  description: z.string().optional(),
})

export type Permission = z.infer<typeof permissionSchema>

export const roleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug is required.' }),
  description: z.string().optional(),
  permissions: z.array(z.string()), // Array of permission IDs
  usersCount: z.number(),
})

export type Role = z.infer<typeof roleSchema>
