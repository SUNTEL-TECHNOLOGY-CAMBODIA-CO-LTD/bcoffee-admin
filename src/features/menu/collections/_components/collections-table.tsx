import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { Edit2, ImageOff, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Collection } from '../../data/collection-schema'

interface CollectionsTableProps {
  data: Collection[]
  onEdit: (collection: Collection) => void
  onDelete: (id: string) => void
}

export function CollectionsTable({
  data,
  onEdit,
  onDelete,
}: CollectionsTableProps) {
  const columns: ColumnDef<Collection>[] = [
    {
      accessorKey: 'bannerUrl',
      header: 'Banner',
      cell: ({ row }) => {
        const url = row.original.bannerUrl
        if (!url) {
          return (
            <div className='flex h-10 w-16 items-center justify-center rounded bg-muted text-muted-foreground'>
              <ImageOff className='h-4 w-4' />
            </div>
          )
        }
        return (
          <img
            src={url}
            alt={row.original.name}
            className='h-10 w-16 rounded object-cover'
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement?.classList.add(
                'flex',
                'items-center',
                'justify-center',
                'bg-muted',
                'text-muted-foreground'
              )
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              e.currentTarget.parentElement?.appendChild(
                document.createTextNode('Image Error')
              )
            }}
          />
        )
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <span className='font-medium'>{row.original.name}</span>
      ),
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <span className='text-sm text-muted-foreground'>
          {row.original.slug}
        </span>
      ),
    },
    {
      accessorKey: 'productIds',
      header: 'Products',
      cell: ({ row }) => (
        <Badge variant='outline'>{row.original.productIds.length} Items</Badge>
      ),
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
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <Edit2 className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive'
                onClick={() => onDelete(row.original.id)}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
