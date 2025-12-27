import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Shop {
  id: string
  name: string
  code: string
  plan: string
  logo?: React.ElementType
  description?: string
  phone?: string
  openingHours?: string
  imageUrl?: string
  coverImageUrl?: string
  address?: string
  locationLat?: number
  locationLong?: number
}

interface ShopState {
  shops: Shop[]
  shopId: string
  setShopId: (id: string) => void
  addShop: (shop: Shop) => void
  updateShop: (id: string, data: Partial<Shop>) => void
}

export const MOCK_SHOPS: Shop[] = [
  {
    id: 'shop_01',
    name: 'B Quick Coffee',
    code: 'BQC-01',
    plan: 'Enterprise',
    description: 'Premium coffee on the go.',
    phone: '+1234567890',
    openingHours: 'Mon-Fri: 7am - 7pm, Sat-Sun: 8am - 5pm',
    imageUrl:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    coverImageUrl:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop',
    address: '123 Coffee Street, Seattle, WA',
    locationLat: 47.6062,
    locationLong: -122.3321,
  },
  {
    id: 'shop_02',
    name: 'B Coffee Lab',
    code: 'BCL-02',
    plan: 'Startup',
    description: 'Experimental brews and beans.',
    phone: '+1987654321',
    openingHours: 'Mon-Sun: 7am - 9pm',
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    coverImageUrl:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2561&auto=format&fit=crop',
    address: '456 Bean Avenue, Portland, OR',
    locationLat: 45.5152,
    locationLong: -122.6784,
  },
]

export const useShopStore = create(
  persist<ShopState>(
    (set) => ({
      shops: MOCK_SHOPS,
      shopId: '',
      setShopId: (id) => set({ shopId: id }),
      addShop: (shop) =>
        set((state) => ({
          shops: [...state.shops, shop],
          shopId: shop.id, // Auto-switch to new shop
        })),
      updateShop: (id, data) =>
        set((state) => ({
          shops: state.shops.map((s) => (s.id === id ? { ...s, ...data } : s)),
          // If we updated the ID of the current shop, update the selection too (rare)
          shopId: state.shopId === id && data.id ? data.id : state.shopId,
        })),
    }),
    {
      name: 'shop-storage',
    }
  ) as StateCreator<ShopState>
)
