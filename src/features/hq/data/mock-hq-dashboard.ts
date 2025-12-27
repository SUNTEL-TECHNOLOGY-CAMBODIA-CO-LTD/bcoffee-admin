export type HqSnapshotData = {
  totalRevenue: number
  activeStores: number
  totalCustomers: number
  networkIssues: number
}

export type ShopLeaderboardItem = {
  id: string
  name: string
  status: 'OPEN' | 'CLOSED'
  sales: number
  orders: number
  rating: number
}

export type SalesTrendItem = {
  time: string
  [key: string]: number | string
}

export const hqSnapshotData: HqSnapshotData = {
  totalRevenue: 12450,
  activeStores: 2, // Based on user request: Downtown (Open) + Uptown (Open) = 2. Mall is Closed.
  totalCustomers: 142, // Random realistic number
  networkIssues: 2, // "2 Shops Offline", "5 Low Stock Alerts" - let's say 2 critical issues
}

export const shopLeaderboardData: ShopLeaderboardItem[] = [
  {
    id: 'shop-1',
    name: 'Downtown',
    status: 'OPEN',
    sales: 5200,
    orders: 145,
    rating: 4.8,
  },
  {
    id: 'shop-2',
    name: 'Uptown',
    status: 'OPEN',
    sales: 3100,
    orders: 89,
    rating: 4.5,
  },
  {
    id: 'shop-3',
    name: 'Mall',
    status: 'CLOSED', // Renovation
    sales: 0,
    orders: 0,
    rating: 4.2,
  },
  {
    id: 'shop-4',
    name: 'Westside',
    status: 'OPEN',
    sales: 4150,
    orders: 110,
    rating: 4.6,
  },
  {
    id: 'shop-5',
    name: 'Airport',
    status: 'OPEN',
    sales: 6800,
    orders: 210,
    rating: 4.9,
  },
]

// Mock hourly sales for top 3 shops
export const salesTrendData = [
  { time: '08:00', Downtown: 400, Uptown: 240, Airport: 650 },
  { time: '09:00', Downtown: 850, Uptown: 300, Airport: 800 },
  { time: '10:00', Downtown: 1200, Uptown: 450, Airport: 950 },
  { time: '11:00', Downtown: 900, Uptown: 380, Airport: 700 },
  { time: '12:00', Downtown: 1500, Uptown: 800, Airport: 1100 }, // Lunch peak
  { time: '13:00', Downtown: 1400, Uptown: 750, Airport: 1050 },
  { time: '14:00', Downtown: 800, Uptown: 400, Airport: 850 },
  { time: '15:00', Downtown: 600, Uptown: 350, Airport: 700 },
]
