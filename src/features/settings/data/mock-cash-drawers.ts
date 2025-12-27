import { subHours, subDays } from 'date-fns'
import { type CashDrawerSession } from './cash-drawer-schema'

// Helper to calc expected
const createDrawer = (
  id: string,
  staff: string,
  start: Date,
  durationHours: number,
  openAmt: number,
  sales: number,
  closeAmt: number,
  status: 'OPEN' | 'CLOSED',
  shopName: string,
  note?: string
): CashDrawerSession => {
  const end = status === 'CLOSED' ? subHours(start, -durationHours) : undefined // add hours for end
  const expected = openAmt + sales
  const diff = status === 'CLOSED' ? closeAmt - expected : undefined

  return {
    id,
    shopId: 'shop-1',
    shopName,
    startedAt: start,
    endedAt: end, // For mock simplicity, just manipulating dates
    openedByStaffId: 'staff-1',
    openedByStaffName: staff,
    openingAmount: openAmt,
    cashSalesCalculated: sales,
    expectedClosingAmount: expected,
    actualClosingAmount: status === 'CLOSED' ? closeAmt : undefined,
    cashDifference: diff,
    status,
    note,
  }
}

const now = new Date()

export const MOCK_CASH_DRAWERS: CashDrawerSession[] = [
  createDrawer(
    'cd-1',
    'Alice Johnson',
    subHours(now, 4),
    0,
    200,
    550,
    0,
    'OPEN',
    'Main St. Cafe'
  ),
  createDrawer(
    'cd-2',
    'Bob Smith',
    subDays(now, 1),
    8,
    200,
    1240.5,
    1440.5,
    'CLOSED',
    'Main St. Cafe'
  ), // Perfect
  createDrawer(
    'cd-3',
    'Alice Johnson',
    subDays(now, 2),
    9,
    200,
    800,
    980,
    'CLOSED',
    'Downtown Kiosk',
    'Took $20 for emergency ice'
  ), // Shortage -20
  createDrawer(
    'cd-4',
    'Charlie Manager',
    subDays(now, 3),
    8,
    200,
    600,
    805,
    'CLOSED',
    'Main St. Cafe'
  ), // Overage +5
]
