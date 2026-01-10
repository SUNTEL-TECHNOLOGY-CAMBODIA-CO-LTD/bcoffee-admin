import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getInventory, adjustStock } from '@/services/ops'
import { type AdjustStockRequest } from '@/types/api'

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
