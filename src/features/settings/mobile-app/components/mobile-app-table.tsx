import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type MobileAppVersion } from '../../data/mobile-app-schema'

interface MobileAppTableProps {
  data: MobileAppVersion[]
  onEdit: (version: MobileAppVersion) => void
}

export function MobileAppTable({ data, onEdit }: MobileAppTableProps) {
  const columns: ColumnDef<MobileAppVersion>[] = [
    {
      accessorKey: 'platform',
      header: 'Platform',
      cell: ({ row }) => (
        <span className='font-medium capitalize'>
          {row.original.platform === 'ios' ? 'iOS' : 'Android'}
        </span>
      ),
    },
    {
      accessorKey: 'latestVersion',
      header: 'Latest Version',
    },
    {
      accessorKey: 'minUsableVersion',
      header: 'Min Usable',
    },
    {
      accessorKey: 'updateUrl',
      header: 'Update URL',
      cell: ({ row }) => (
        <a
          href={row.original.updateUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='block max-w-[200px] truncate text-blue-500 hover:underline'
        >
          {row.original.updateUrl}
        </a>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onEdit(row.original)}
          >
            <Edit2 className='h-4 w-4' />
          </Button>
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
