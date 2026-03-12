export enum ProgramType {
  NEW_USER = 'NEW_USER',
  STAMP_CARD = 'STAMP_CARD',
  REFERRAL = 'REFERRAL',
}

export enum ProgramStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

export interface NewUserConfig {
  rewardPromotionId: string
}

export interface StampCardMilestone {
  stamps: number
  rewardPromotionId: string
}

export interface StampCardConfig {
  maxStamps: number
  milestones: StampCardMilestone[]
  maxEarnedStampsPerOrder?: number
}

export interface ReferralConfig {
  referrerRewardPromotionId: string
  refereeRewardPromotionId: string
}

export type ProgramConfig = NewUserConfig | StampCardConfig | ReferralConfig

export interface Program {
  id: string
  businessId: string
  name: string
  description?: string
  type: ProgramType
  status: ProgramStatus
  config: ProgramConfig
  displayPromotionId?: string
  validFrom?: string
  validUntil?: string
  createdAt: string
  updatedAt: string
}

export interface CreateProgramDto {
  name: string
  description?: string
  type: ProgramType
  businessId: string
  displayPromotionId?: string
  config: ProgramConfig
  status?: ProgramStatus
  validFrom?: Date
  validUntil?: Date
}
