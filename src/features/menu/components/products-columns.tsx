import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ImageIcon } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import { getTranslation } from '@/utils/i18n'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table'
import { MOCK_CATEGORIES } from '../data/mock-categories'
import { type Product, ProductStatus } from '../data/schema'

const getCategoryName = (categoryId: string) => {
  const category = MOCK_CATEGORIES.find((c) => c.id === categoryId)
  return category ? getTranslation(category.name) : 'Unknown'
}

export type ProductActions = {
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export const getColumns = ({
  onEdit,
  onDelete,
}: ProductActions): ColumnDef<Product>[] => [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as
        | Record<string, string>
        | undefined
      const url = imageUrl ? getTranslation(imageUrl) : ''
      return (
        <div className='flex h-10 w-10 items-center justify-center rounded bg-muted'>
          {url ? (
            <img
              src={url}
              alt={getTranslation(row.original.name)}
              className='h-full w-full rounded object-cover'
            />
          ) : (
            <ImageIcon className='h-5 w-5 text-muted-foreground' />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => getTranslation(row.original.name),
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    cell: ({ row }) => <span className='font-mono'>{row.getValue('sku')}</span>,
  },
  {
    accessorKey: 'categoryId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => getCategoryName(row.getValue('categoryId')),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => formatCurrency(row.getValue('price')),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as ProductStatus

      const className =
        status === ProductStatus.ACTIVE
          ? 'bg-green-500 hover:bg-green-600'
          : status === ProductStatus.DRAFT
            ? 'bg-gray-500 hover:bg-gray-600'
            : 'bg-red-500 hover:bg-red-600'

      return <Badge className={className}>{status}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(row.original.sku)}
            >
              Copy SKU
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-destructive'
              onClick={() => onDelete(row.original)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
