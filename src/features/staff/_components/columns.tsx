import { type ColumnDef } from '@tanstack/react-table'
import { type Staff } from '@/types/staff'
import { Edit, KeyRound, MoreHorizontal, UserX } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'

// Helper to get primary role (simplistic: returns the first role name found)
const getPrimaryRole = (staff: Staff) => {
  if (staff.access.length === 0) return 'No Role'
  return staff.access[0].role?.name.en || 'Unknown'
}

interface TableMeta {
  onEdit: (staff: Staff) => void
}

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee' />
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
            <span className='text-xs text-muted-foreground'>
              @{staff.username}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    id: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Primary Role' />
    ),
    cell: ({ row }) => {
      return <Badge variant='outline'>{getPrimaryRole(row.original)}</Badge>
    },
  },
  {
    accessorKey: 'access',
    header: 'Access',
    cell: ({ row }) => {
      const count = row.original.access.length
      return (
        <span className='text-sm text-muted-foreground'>
          {count} {count === 1 ? 'Location' : 'Locations'}
        </span>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      const variant =
        status === 'ACTIVE'
          ? 'default'
          : status === 'INACTIVE'
            ? 'destructive'
            : 'secondary'
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const staff = row.original
      const meta = table.options.meta as TableMeta

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => meta?.onEdit(staff)}>
              <Edit className='mr-2 h-4 w-4' />
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRound className='mr-2 h-4 w-4' />
              Reset PIN
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-destructive'>
              <UserX className='mr-2 h-4 w-4' />
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
