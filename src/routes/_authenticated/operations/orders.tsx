import { z } from 'zod'
import { format, startOfWeek, endOfWeek } from 'date-fns'
import { createFileRoute } from '@tanstack/react-router'
import OrdersPage from '@/features/operations/orders/index'

const ordersSearchSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(10),
  search: z.string().optional(),
  status: z.string().optional(),
  startDate: z
    .string()
    .catch(() =>
      format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
    ),
  endDate: z
    .string()
    .catch(() =>
      format(endOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
    ),
})

export const Route = createFileRoute('/_authenticated/operations/orders')({
  component: OrdersPage,
  validateSearch: ordersSearchSchema,
})
