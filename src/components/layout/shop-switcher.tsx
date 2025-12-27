import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ShopSheet } from '@/features/settings/components/shop-sheet'

export function ShopSwitcher() {
  const { isMobile } = useSidebar()
  const { shops, shopId, setShopId } = useShopStore()
  const [showCreateSheet, setShowCreateSheet] = React.useState(false)

  // Set initial shop if none selected
  React.useEffect(() => {
    if (!shopId && shops.length > 0) {
      setShopId(shops[0].id)
    }
  }, [shopId, shops, setShopId])

  const activeShop = shops.find((s) => s.id === shopId) || shops[0]

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  {activeShop?.logo && <activeShop.logo className='size-4' />}
                </div>
                <div className='grid flex-1 text-start text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {activeShop?.name}
                  </span>
                  <span className='truncate text-xs'>{activeShop?.plan}</span>
                </div>
                <ChevronsUpDown className='ms-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              align='start'
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className='text-xs text-muted-foreground'>
                Shops
              </DropdownMenuLabel>
              {shops.map((shop, index) => (
                <DropdownMenuItem
                  key={shop.id}
                  onClick={() => setShopId(shop.id)}
                  className='gap-2 p-2'
                >
                  <div className='flex size-6 items-center justify-center rounded-sm border'>
                    {shop.logo && <shop.logo className='size-4 shrink-0' />}
                  </div>
                  {shop.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='gap-2 p-2'
                onClick={(e) => {
                  e.preventDefault()
                  setShowCreateSheet(true)
                }}
              >
                <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                  <Plus className='size-4' />
                </div>
                <div className='font-medium text-muted-foreground'>
                  Add shop
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <ShopSheet open={showCreateSheet} onOpenChange={setShowCreateSheet} />
    </>
  )
}
