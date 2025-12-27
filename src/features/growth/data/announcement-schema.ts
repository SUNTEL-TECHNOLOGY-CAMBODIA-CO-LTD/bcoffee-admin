import { z } from 'zod'

export const announcementTargetAudienceSchema = z.enum([
  'CUSTOMER',
  'STAFF',
  'ALL',
])

export const announcementPrioritySchema = z.enum(['HIGH', 'NORMAL'])

export const announcementSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional(),
  targetAudience: announcementTargetAudienceSchema,
  priority: announcementPrioritySchema.default('NORMAL'),
  isActive: z.boolean().default(true),
  publishedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type AnnouncementTargetAudience = z.infer<
  typeof announcementTargetAudienceSchema
>
export type AnnouncementPriority = z.infer<typeof announcementPrioritySchema>
export type Announcement = z.infer<typeof announcementSchema>
