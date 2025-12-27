import { type ColumnDef } from '@tanstack/react-table'
import { type Staff } from '@/types/staff'
import { KeyRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/data-table'

// We need the shopId context to determine the role
// This is passed via meta
interface TableMeta {
  shopId: string
  onResetPin: (staff: Staff) => void
}

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const staff = row.original
      return (
        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={staff.profileImageUrl} alt={staff.fullName} />
            <AvatarFallback>{staff.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='font-medium'>{staff.fullName}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: 'role',
    header: 'Role',
    cell: ({ row, table }) => {
      const staff = row.original
      const meta = table.options.meta as TableMeta
      const shopId = meta.shopId

      const access = staff.access.find((a) => a.shopId === shopId)
      const roleName = access?.role?.name?.en || 'Unknown'

      return <Badge variant='outline'>{roleName}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const staff = row.original
      const meta = table.options.meta as TableMeta

      return (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => meta.onResetPin(staff)}
        >
          <KeyRound className='mr-2 h-4 w-4' />
          Reset PIN
        </Button>
      )
    },
  },
]
