import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BrandLoader } from '@/components/ui/brand-loader'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/custom/data-table'
import { PageTitle } from '@/components/page-title'
import { columns } from '@/features/loyalty/components/columns'
import { ProgramCreateSheet } from '@/features/loyalty/components/program-create.sheet'
import { ProgramEditSheet } from './program-edit.sheet'
import { usePrograms } from '@/features/loyalty/hooks/use-programs'
import { type Program } from '@/types/loyalty'

export default function ProgramListView() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: programsData, isLoading } = usePrograms({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  const programs = programsData?.data || []
  const pageCount = programsData?.meta?.totalPages || 0

  if (isLoading) {
    return (
      <div className='flex h-[80vh] w-full items-center justify-center p-6'>
        <BrandLoader />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 p-6 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <PageTitle title='Loyalty Programs' />
        <Button onClick={() => setIsSheetOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> Create Program
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={programs}
        searchKey='name'
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
        meta={{
          onEdit: (program: Program) => {
            setSelectedProgram(program)
            setIsEditSheetOpen(true)
          }
        }}
      />

      <ProgramCreateSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />

      <ProgramEditSheet
        isOpen={isEditSheetOpen}
        onClose={() => {
          setIsEditSheetOpen(false)
          setSelectedProgram(null)
        }}
        program={selectedProgram}
        onSuccess={() => {
          // Programs are automatically refetched due to query invalidation in useUpdateProgram
        }}
      />
    </div>
  )
}
