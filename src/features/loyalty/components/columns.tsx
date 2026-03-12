import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { type Program, ProgramStatus, ProgramType } from '@/types/loyalty'
import { ActionCell } from './action-cell'

export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: 'name',
    header: 'Program Name',
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type
      let label = type as string
      let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'outline'

      switch (type) {
         case ProgramType.NEW_USER:
            label = 'New User'
            variant = 'default'
            break
         case ProgramType.STAMP_CARD:
            label = 'Stamp Card'
            variant = 'secondary'
            break
         case ProgramType.REFERRAL:
            label = 'Referral'
            // variant 'outline' is already set
            break
      }

      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'outline'

      if (status === ProgramStatus.ACTIVE) variant = 'default'
      if (status === ProgramStatus.PAUSED) variant = 'secondary'
      if (status === ProgramStatus.ARCHIVED) variant = 'destructive'

      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => format(new Date(row.original.createdAt), 'PP'),
  },
  {
    id: 'actions',
    cell: ({ row, table }) => <ActionCell program={row.original} table={table} />,
  },
]
