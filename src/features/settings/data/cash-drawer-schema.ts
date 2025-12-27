import { z } from 'zod'

export const cashDrawerStatusSchema = z.enum(['OPEN', 'CLOSED'])

export const cashDrawerSchema = z.object({
  id: z.string(),
  shopId: z.string(),
  shopName: z.string(),
  startedAt: z.date(),
  endedAt: z.date().optional(),
  openedByStaffId: z.string(),
  openedByStaffName: z.string(),
  closedByStaffId: z.string().optional(),
  closedByStaffName: z.string().optional(),
  openingAmount: z.number(),
  cashSalesCalculated: z.number(),
  expectedClosingAmount: z.number(), // calculated: opening + cashSales
  actualClosingAmount: z.number().optional(),
  cashDifference: z.number().optional(), // actual - expected
  status: cashDrawerStatusSchema,
  note: z.string().optional(),
})

export type CashDrawerStatus = z.infer<typeof cashDrawerStatusSchema>
export type CashDrawerSession = z.infer<typeof cashDrawerSchema>
