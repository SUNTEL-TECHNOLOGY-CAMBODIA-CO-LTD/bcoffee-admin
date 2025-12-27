import { useState } from 'react'
import { useShopStore } from '@/stores/shop-store'
import { PageTitle } from '@/components/page-title'
import { type ShopIngredient } from './components/columns'
import { InventorySheet } from './components/inventory-sheet'
import { InventoryTable } from './components/inventory-table'

const mockData: ShopIngredient[] = [
  {
    id: 'SI-001',
    shopId: 'B Quick Coffee',
    ingredientId: 'ING-001',
    currentStock: 12000,
    price: 3.5,
    lowStockThreshold: 5000,
    ingredient: {
      name: 'Oatly Barista Edition',
      sku: 'OAT-BAR-01',
      unit: 'ml',
    },
  },
  {
    id: 'SI-002',
    shopId: 'B Quick Coffee',
    ingredientId: 'ING-002',
    currentStock: 500,
    price: 18.0,
    lowStockThreshold: 2000,
    ingredient: {
      name: 'Espresso Beans (Signature Blend)',
      sku: 'BEAN-SIG-01',
      unit: 'g',
    },
  },
  {
    id: 'SI-003',
    shopId: 'B Coffee Lab',
    ingredientId: 'ING-003',
    currentStock: 150,
    price: 0.05,
    lowStockThreshold: 100,
    ingredient: {
      name: 'Paper Cups 8oz',
      sku: 'CUP-8OZ-01',
      unit: 'pcs',
    },
  },
  {
    id: 'SI-004',
    shopId: 'B Quick Coffee',
    ingredientId: 'ING-004',
    currentStock: 800,
    price: 8.5,
    lowStockThreshold: 1000,
    ingredient: {
      name: 'Vanilla Syrup (Monin)',
      sku: 'SYR-VAN-01',
      unit: 'ml',
    },
  },
  {
    id: 'SI-005',
    shopId: 'B Coffee Lab',
    ingredientId: 'ING-005',
    currentStock: 2500,
    price: 1.2,
    lowStockThreshold: 3000,
    ingredient: {
      name: 'Whole Milk',
      sku: 'DAIRY-MILK-01',
      unit: 'ml',
    },
  },
]

export default function Inventory() {
  const [open, setOpen] = useState(false)
  const { shopId } = useShopStore()

  // Filter data based on selected shop
  const shopData = mockData.filter((item) => item.shopId === shopId)

  return (
    <div className='p-6'>
      <PageTitle
        title='Inventory'
        subtitle={`Manage stock levels for ${shopId || 'all shops'}.`}
        onClick={() => setOpen(true)}
      />
      <InventoryTable data={shopData} />

      <InventorySheet open={open} onOpenChange={setOpen} />
    </div>
  )
}
