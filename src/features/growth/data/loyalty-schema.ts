import { z } from 'zod'

export const loyaltySettingsSchema = z.object({
  earningRate: z.number().min(0, 'Must be positive'), // Points per $1
  redemptionRate: z.number().min(0, 'Must be positive'), // Points for $1 discount
  referralBonusReferrer: z.number().min(0, 'Must be positive'), // $ Amount
  referralBonusReferee: z.number().min(0, 'Must be positive'), // $ Amount
})

export const userLoyaltyBalanceSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  email: z.string().email(),
  pointsBalance: z.number().int(),
  lifetimePoints: z.number().int(),
})

export type LoyaltySettings = z.infer<typeof loyaltySettingsSchema>
export type UserLoyaltyBalance = z.infer<typeof userLoyaltyBalanceSchema>
