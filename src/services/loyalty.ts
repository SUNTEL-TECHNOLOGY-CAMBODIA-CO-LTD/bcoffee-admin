import { apiClient } from '@/lib/api-client'
import { type PaginationMeta } from '@/types/api'
import { type Promotion, DiscountType } from '@/types/growth'
import {
  type CreateProgramDto,
  type Program,
} from '@/types/loyalty'
import type {
  LoyaltySettings,
  MembershipTier,
  UserLoyaltyBalance,
} from '@/features/growth/data/loyalty-schema'

// --- New Program Service ---

export const getPrograms = async (params?: {
  page?: number
  limit?: number
  businessId?: string
}): Promise<{
  data: Program[]
  meta?: PaginationMeta
}> => {
  const response = await apiClient.get('/admin/programs', { params })

  return {
    data: response.data?.data || [],
    meta: response.data?.meta,
  }
}

export const getProgram = async (id: string): Promise<Program> => {
  const response = await apiClient.get(`/admin/programs/${id}`)
  return response.data
}

export const createProgram = async (data: CreateProgramDto): Promise<Program> => {
  const response = await apiClient.post('/admin/programs', data)
  return response.data
}

export const updateProgram = async (args: {
  id: string
  data: Partial<CreateProgramDto>
}): Promise<Program> => {
  const { id, data } = args
  const response = await apiClient.patch(`/admin/programs/${id}`, data)
  return response.data
}

export const deleteProgram = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/programs/${id}`)
}

// --- Legacy Loyalty Service (Keeping for compatibility until fully migrated) ---

function mapPromotionToSettings(data: Promotion): LoyaltySettings {
  const loyaltyRule =
    data.rules?.find(
      (r: Record<string, unknown>) => r.type === 'LOYALTY_BALANCE'
    ) || {}

  return {
    isActive: data.status === 'ACTIVE',
    type: data.type || DiscountType.PERCENTAGE,
    value: data.value ? Number(data.value) : 100,
    minimumSpendPerStamp:
      ((loyaltyRule as Record<string, unknown>).spend_per_stamp as number) ?? 0,
    stampsRequiredForReward:
      ((loyaltyRule as Record<string, unknown>).stamps_required as number) ?? 0,
    stampCardDurationDays:
      ((loyaltyRule as Record<string, unknown>).card_duration_days as number) ??
      60,
    includeProducts: (
      (data as unknown as { products?: Array<string | { id: string }> })
        .products || []
    )
      .map((p) => (typeof p === 'string' ? p : p?.id))
      .filter((id): id is string => Boolean(id)),
    includeCategories: (
      (data as unknown as { categories?: Array<string | { id: string }> })
        .categories || []
    )
      .map((c) => (typeof c === 'string' ? c : c?.id))
      .filter((id): id is string => Boolean(id)),
    membershipTiers: ((
      data as unknown as { membershipTiers?: MembershipTier[] }
    ).membershipTiers || []) as MembershipTier[],
    lastProductSync: (data as unknown as { lastProductSync?: string })
      .lastProductSync,
  }
}

function mapSettingsToPromotionUpdate(
  settings: LoyaltySettings
): Record<string, unknown> {
  return {
    status: settings.isActive ? 'ACTIVE' : 'INACTIVE',
    type: settings.type,
    value: settings.value,
    rules: [
      {
        type: 'LOYALTY_BALANCE',
        spend_per_stamp: settings.minimumSpendPerStamp,
        stamps_required: settings.stampsRequiredForReward,
        stamp_multiplier: 1,
        card_duration_days: settings.stampCardDurationDays,
      } as Record<string, unknown>,
    ],
    includeProducts: settings.includeProducts,
    includeCategories: settings.includeCategories,
    membershipTiers: settings.membershipTiers,
  }
}

export const getLoyaltySettings = async (): Promise<LoyaltySettings> => {
  const response = await apiClient.get('/admin/loyalty-program')
  return mapPromotionToSettings(response.data)
}

export const updateLoyaltySettings = async (
  data: LoyaltySettings
): Promise<LoyaltySettings> => {
  const payload = mapSettingsToPromotionUpdate(data)
  const response = await apiClient.patch('/admin/loyalty-program', payload)
  return mapPromotionToSettings(response.data)
}

export const getCustomerBalances = async (
  params?: Record<string, unknown>
): Promise<{ data: UserLoyaltyBalance[]; meta: PaginationMeta }> => {
  const response = await apiClient.get('/admin/loyalty-program/balances', {
    params,
  })
  return {
    data: response.data?.items ?? [],
    meta: {
      totalItems: response.data?.meta?.totalItems ?? 0,
      itemCount: response.data?.meta?.itemCount ?? 0,
      itemsPerPage: response.data?.meta?.itemsPerPage ?? 10,
      totalPages: response.data?.meta?.totalPages ?? 1,
      currentPage: response.data?.meta?.currentPage ?? 1,
    },
  }
}
