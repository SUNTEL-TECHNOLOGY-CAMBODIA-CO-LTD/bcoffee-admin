import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit2, Trash2, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/custom/data-table'
import { type Announcement } from '../../data/announcement-schema'

interface AnnouncementsTableProps {
  data: Announcement[]
  onEdit: (announcement: Announcement) => void
  onDelete: (id: string) => void
}

export function AnnouncementsTable({
  data,
  onEdit,
  onDelete,
}: AnnouncementsTableProps) {
  const columns: ColumnDef<Announcement>[] = [
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: ({ row }) =>
        row.original.imageUrl ? (
          <div className='h-10 w-16 overflow-hidden rounded-md border bg-muted'>
            <img
              src={row.original.imageUrl}
              alt={row.original.title}
              className='h-full w-full object-cover'
            />
          </div>
        ) : (
          <div className='flex h-10 w-16 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground'>
            No Img
          </div>
        ),
    },
    {
      accessorKey: 'title',
      header: 'Announcement',
      cell: ({ row }) => (
        <div className='flex flex-col'>
          <span className='max-w-[200px] truncate font-medium'>
            {row.original.title}
          </span>
          {row.original.priority === 'HIGH' && (
            <Badge
              variant='destructive'
              className='mt-1 h-4 w-fit px-1 py-0 text-[10px]'
            >
              High Priority
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'targetAudience',
      header: 'Audience',
      cell: ({ row }) => {
        const audience = row.original.targetAudience
        return (
          <Badge variant='outline'>
            {audience === 'ALL' ? 'Everyone' : audience}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      accessorKey: 'publishedAt',
      header: 'Published',
      cell: ({ row }) => (
        <span className='text-sm text-muted-foreground'>
          {format(row.original.publishedAt, 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <Edit2 className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(row.original.id)}
              className='text-destructive focus:text-destructive'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return <DataTable columns={columns} data={data} searchKey='title' />
}
