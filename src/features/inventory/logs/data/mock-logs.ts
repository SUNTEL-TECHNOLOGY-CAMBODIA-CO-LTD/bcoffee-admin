export interface InventoryLogMock {
  id: string
  shopId: string
  ingredientId: string
  ingredientName: string
  changeQuantity: number
  unitSymbol: string
  reason: 'SALE' | 'WASTE' | 'RESTOCK' | 'CORRECTION' | 'DAMAGE'
  staffName?: string
  note?: string
  createdAt: string
}

export const MOCK_INVENTORY_LOGS: InventoryLogMock[] = [
  {
    id: 'log-1',
    shopId: 'shop-1',
    ingredientId: 'ing-1',
    ingredientName: 'Espresso Beans',
    changeQuantity: -18,
    unitSymbol: 'g',
    reason: 'SALE',
    staffName: 'System',
    note: 'Order #1234',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'log-2',
    shopId: 'shop-1',
    ingredientId: 'ing-1',
    ingredientName: 'Espresso Beans',
    changeQuantity: -50,
    unitSymbol: 'g',
    reason: 'WASTE',
    staffName: 'Alice Smith',
    note: 'Spilled during calibration',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'log-3',
    shopId: 'shop-1',
    ingredientId: 'ing-2',
    ingredientName: 'Whole Milk',
    changeQuantity: 5000,
    unitSymbol: 'ml',
    reason: 'RESTOCK',
    staffName: 'Bob Jones',
    note: 'Delivery from Dairy Co.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'log-4',
    shopId: 'shop-1',
    ingredientId: 'ing-2',
    ingredientName: 'Whole Milk',
    changeQuantity: -200,
    unitSymbol: 'ml',
    reason: 'SALE',
    staffName: 'System',
    note: 'Order #1235',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
]
