import type { Shop, Staff } from '@/types/api'
import { create } from 'zustand'

interface AppState {
  user: Staff | null
  shops: Shop[]
  activeShopId: string | null
  setUser: (user: Staff | null) => void
  setShops: (shops: Shop[]) => void
  setActiveShopId: (shopId: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  shops: [],
  activeShopId: localStorage.getItem('activeShopId'),
  setUser: (user) => set({ user }),
  setShops: (shops) => set({ shops }),
  setActiveShopId: (shopId) => {
    if (shopId) {
      localStorage.setItem('activeShopId', shopId)
    } else {
      localStorage.removeItem('activeShopId')
    }
    set({ activeShopId: shopId })
  },
}))
