import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
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
import { type Role } from '../data/role-schema'

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: 'Role',
    cell: ({ row }) => {
      const name = row.original.name
      const slug = row.original.slug
      return (
        <div className='flex flex-col'>
          <span className='font-medium'>{name}</span>
          <span className='text-xs text-muted-foreground'>{slug}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className='max-w-[400px] truncate text-muted-foreground'>
        {row.original.description || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'usersCount',
    header: 'Users Assigned',
    cell: ({ row }) => (
      <Badge variant='secondary'>{row.original.usersCount} Users</Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const role = row.original
      const meta = table.options.meta as {
        onEdit: (role: Role) => void
        onDelete: (role: Role) => void
      }

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
            <DropdownMenuItem onClick={() => meta.onEdit(role)}>
              <Pencil className='mr-2 h-4 w-4' />
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => meta.onDelete(role)}
              className='text-destructive'
            >
              <Trash className='mr-2 h-4 w-4' />
              Delete Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
