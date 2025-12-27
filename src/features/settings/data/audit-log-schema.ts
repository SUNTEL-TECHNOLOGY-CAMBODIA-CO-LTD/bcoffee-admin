import { z } from 'zod'

export const auditLogActionTypeSchema = z.enum([
  'CREATE',
  'UPDATE',
  'DELETE',
  'REFUND',
])

export const auditLogSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  actorStaffId: z.string(),
  actorName: z.string(),
  actionType: auditLogActionTypeSchema,
  targetResource: z.string(),
  shopId: z.string().optional(),
  shopCode: z.string().optional(),
  details: z.record(z.string(), z.any()), // JSON field for changes
  authorizedByStaffId: z.string().optional(),
  authorizedByName: z.string().optional(),
})

export type AuditLogActionType = z.infer<typeof auditLogActionTypeSchema>
export type AuditLog = z.infer<typeof auditLogSchema>
