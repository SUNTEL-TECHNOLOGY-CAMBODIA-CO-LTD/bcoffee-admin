import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { ProgramType } from '@/types/loyalty'

const searchSchema = z.object({
  type: z.nativeEnum(ProgramType).optional(),
})

export const Route = createFileRoute('/_authenticated/loyalty/programs/create')({
  validateSearch: searchSchema,
})
