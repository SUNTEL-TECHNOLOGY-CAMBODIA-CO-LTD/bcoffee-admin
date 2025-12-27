import { type ShiftSession } from './shift-schema'

export const MOCK_ACTIVE_SHIFT: ShiftSession = {
  id: 'shift-active-1',
  shopId: 'shop-1',
  userId: 'u1',
  userName: 'Alice Staff',
  startedAt: new Date(new Date().setHours(8, 0, 0, 0)), // Started at 8 AM today
  openingBalance: 200,
  cashSales: 450.5,
  expectedTotal: 650.5,
  status: 'OPEN',
}
