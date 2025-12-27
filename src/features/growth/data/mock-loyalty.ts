import { type LoyaltySettings, type UserLoyaltyBalance } from './loyalty-schema'

export const MOCK_LOYALTY_SETTINGS: LoyaltySettings = {
  earningRate: 10,
  redemptionRate: 100,
  referralBonusReferrer: 5.0,
  referralBonusReferee: 3.0,
}

export const MOCK_USER_LOYALTY_BALANCES: UserLoyaltyBalance[] = [
  {
    userId: 'u1',
    userName: 'Alice Johnson',
    email: 'alice@example.com',
    pointsBalance: 450,
    lifetimePoints: 1200,
  },
  {
    userId: 'u2',
    userName: 'Bob Smith',
    email: 'bob@example.com',
    pointsBalance: 120,
    lifetimePoints: 340,
  },
  {
    userId: 'u3',
    userName: 'Charlie Davis',
    email: 'charlie@example.com',
    pointsBalance: 0,
    lifetimePoints: 50,
  },
  {
    userId: 'u4',
    userName: 'Diana Prince',
    email: 'diana@example.com',
    pointsBalance: 2500,
    lifetimePoints: 5000,
  },
]
