import { useState } from 'react'
import { type ShopIngredient } from '@/types/inventory'
import { useShopStock } from '@/hooks/queries/use-inventory'
import { useAppStore } from '@/hooks/use-app-store'
import { BrandLoader } from '@/components/ui/brand-loader'
import { PageTitle } from '@/components/page-title'
// import { InventorySheet } from './_components/inventory-sheet'
import { InventoryTable } from './_components/inventory-table'
import { StockAdjustmentSheet } from './_components/stock-adjustment-sheet'

export default function Inventory() {
  // const [open, setOpen] = useState(false)
  const [adjustmentOpen, setAdjustmentOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ShopIngredient | null>(null)
  const { activeShopId: shopId } = useAppStore()

  const { data: shopData, isLoading } = useShopStock(shopId || '')

  const handleAdjust = (item: ShopIngredient) => {
    setSelectedItem(item)
    setAdjustmentOpen(true)
  }

  return (
    <div className='p-6'>
      <PageTitle
        title='Stock Levels'
        subtitle={`Manage stock levels for ${shopId || 'all shops'}.`}
        // onClick={() => setOpen(true)}
        // buttonLabel='Receive Stock'
      />

      {isLoading ? (
        <div className='flex justify-center p-8'>
          <BrandLoader />
        </div>
      ) : (
        <InventoryTable data={shopData || []} onAdjust={handleAdjust} />
      )}

      {/* <InventorySheet open={open} onOpenChange={setOpen} /> */}

      <StockAdjustmentSheet
        open={adjustmentOpen}
        onOpenChange={(val) => {
          setAdjustmentOpen(val)
          if (!val) setSelectedItem(null)
        }}
        item={selectedItem}
        shopId={shopId || ''}
      />
    </div>
  )
}
