import { z } from 'zod'

export const shiftStatusSchema = z.enum(['OPEN', 'CLOSED'])

export const shiftSessionSchema = z.object({
  id: z.string(),
  shopId: z.string(),
  userId: z.string(),
  userName: z.string(),
  startedAt: z.date(),
  endedAt: z.date().optional(),
  openingBalance: z.number(),
  cashSales: z.number().default(0), // Mocked running total
  expectedTotal: z.number(), // opening + cashSales
  closingBalance: z.number().optional(),
  status: shiftStatusSchema,
  note: z.string().optional(),
})

export type ShiftSession = z.infer<typeof shiftSessionSchema>
