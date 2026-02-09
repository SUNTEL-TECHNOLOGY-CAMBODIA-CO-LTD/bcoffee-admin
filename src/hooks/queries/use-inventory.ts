import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// --- Inventory Management (Full Control) ---

import {
  createIngredient,
  createUnit,
  getIngredients,
  getUnits,
  updateIngredient,
  updateUnit,
  deleteUnit,
} from '@/services/inventory'
import { getInventory, adjustStock } from '@/services/ops'
import { type AdjustStockRequest } from '@/types/api'
import {
  type CreateIngredientDto,
  type CreateUnitDto,
  type UpdateIngredientDto,
  type UpdateUnitDto,
} from '@/types/inventory'

export const useInventory = (shopId: string) => {
  return useQuery({
    queryKey: ['inventory', shopId],
    queryFn: () => getInventory(shopId),
    enabled: !!shopId,
  })
}

export const useAdjustStock = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AdjustStockRequest) => adjustStock(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['inventory', variables.shopId],
      })
    },
  })
}

// Units
export const useUnits = () => {
  return useQuery({
    queryKey: ['units'],
    queryFn: getUnits,
  })
}

export const useCreateUnit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUnitDto) => createUnit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })
}

export const useUpdateUnit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUnitDto }) =>
      updateUnit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })
}

export const useDeleteUnit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteUnit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
    },
  })
}

// Ingredients
export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
  })
}

export const useCreateIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateIngredientDto) => createIngredient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] })
    },
  })
}

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIngredientDto }) =>
      updateIngredient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] })
    },
  })
}
