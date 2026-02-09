import * as React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
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
  const { shops, activeShopId, setActiveShopId } = useAppStore()
  const [showCreateSheet, setShowCreateSheet] = React.useState(false)

  // Set initial shop if none selected
  React.useEffect(() => {
    if (!activeShopId && shops.length > 0) {
      setActiveShopId(shops[0].id)
    }
  }, [activeShopId, shops, setActiveShopId])

  const activeShop = shops.find((s) => s.id === activeShopId) || shops[0]

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
                  {/* Logo support pending API update */}
                  <span className='font-bold'>
                    {activeShop?.code?.substring(0, 2)}
                  </span>
                </div>
                <div className='grid flex-1 text-start text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {/* Simplified localized text handling */}
                    {activeShop?.name?.['en'] || 'Shop'}
                  </span>
                  <span className='truncate text-xs'>{activeShop?.code}</span>
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
                  onClick={() => setActiveShopId(shop.id)}
                  className='gap-2 p-2'
                >
                  <div className='flex size-6 items-center justify-center rounded-sm border'>
                    <span className='text-xs font-bold'>
                      {shop.code?.substring(0, 2)}
                    </span>
                  </div>
                  {shop.name?.['en'] || 'Shop'}
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
