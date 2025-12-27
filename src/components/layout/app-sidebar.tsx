import { hqNav, storeNav } from '@/config/nav'
import { useShopStore } from '@/stores/shop-store'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { ShopSwitcher } from './shop-switcher'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { shopId } = useShopStore()

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <ShopSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {/* Store Operations Group */}
        <NavGroup
          title={`Store: ${shopId || 'Select Shop'}`}
          items={storeNav}
        />

        <SidebarSeparator className='mx-0' />

        {/* Head Office Group */}
        <NavGroup title='Head Office' items={hqNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
