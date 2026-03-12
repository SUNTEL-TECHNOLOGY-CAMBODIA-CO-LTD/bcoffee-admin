import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Program } from '@/types/loyalty'
import { useDeleteProgram } from '../hooks/use-programs'

interface ActionCellProps {
  program: Program
  table: Table<Program>
}

export function ActionCell({ program, table }: ActionCellProps) {
  const { mutate: deleteProgram } = useDeleteProgram()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(program.id, {
        onSuccess: () => toast.success('Program deleted'),
        onError: () => toast.error('Failed to delete program'),
      })
    }
  }

  const onEdit = (table.options.meta as { onEdit?: (p: Program) => void })?.onEdit

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
          onClick={() => navigator.clipboard.writeText(program.id)}
        >
          Copy Program ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit?.(program)}>
          <SquarePen className='mr-2 h-4 w-4' /> Edit Program
        </DropdownMenuItem>
        <DropdownMenuItem className='text-destructive' onClick={handleDelete}>
          <Trash2 className='mr-2 h-4 w-4' /> Delete Program
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
