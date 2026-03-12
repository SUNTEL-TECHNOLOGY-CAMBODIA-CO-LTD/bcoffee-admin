import { useNavigate } from '@tanstack/react-router'
import { useShopInventoryLogs } from '@/hooks/queries/use-inventory'
import { BrandLoader } from '@/components/ui/brand-loader'
import { PageTitle } from '@/components/page-title'
import { InventoryLogTable } from './_components/inventory-log-table'

export default function InventoryLogsPage({
  shopId,
  page = 1,
  limit = 20,
}: {
  shopId: string
  page?: number
  limit?: number
}) {
  const { data: logs, isLoading } = useShopInventoryLogs(shopId, {
    page,
    limit,
  })
  const navigate = useNavigate()

  const onPaginationChange = (pagination: {
    pageIndex: number
    pageSize: number
  }) => {
    navigate({
      to: '.',
      search: (old: any) => ({
        ...old,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      }),
    })
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <PageTitle
          title='Inventory Logs'
          subtitle='Track all incoming and outgoing ingredients, sales deductions, and restocks.'
        />
      </div>

      <div>
        {isLoading ? (
          <div className='flex justify-center p-8'>
            <BrandLoader />
          </div>
        ) : (
          <InventoryLogTable
            data={logs?.data || []}
            pageCount={logs?.meta.totalPages}
            pagination={{
              pageIndex: page - 1,
              pageSize: limit,
            }}
            onPaginationChange={onPaginationChange}
          />
        )}
      </div>
    </div>
  )
}
