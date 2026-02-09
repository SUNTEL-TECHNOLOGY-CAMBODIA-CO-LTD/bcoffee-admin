import { type Ingredient } from '@/types/inventory'
import { Edit } from 'lucide-react'
import { formatCurrency } from '@/utils/format'
import { getTranslation } from '@/utils/i18n'
import { useIngredients } from '@/hooks/queries/use-inventory'
import { BrandLoader } from '@/components/ui/brand-loader'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface IngredientsTableProps {
  onEdit: (ingredient: Ingredient) => void
}

export function IngredientsTable({ onEdit }: IngredientsTableProps) {
  const { data: ingredients, isLoading } = useIngredients()

  if (isLoading) {
    return (
      <div className='flex justify-center p-8'>
        <BrandLoader />
      </div>
    )
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Base Unit</TableHead>
            <TableHead className='text-right'>Default Cost</TableHead>
            <TableHead className='w-[80px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients?.length ? (
            ingredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className='font-medium'>
                  {getTranslation(ingredient.name)}
                </TableCell>
                <TableCell>{ingredient.sku || '-'}</TableCell>
                <TableCell>
                  {ingredient.unit
                    ? getTranslation(ingredient.unit.symbol)
                    : '-'}
                </TableCell>
                <TableCell className='text-right'>
                  {ingredient.cost ? formatCurrency(ingredient.cost) : '-'}
                </TableCell>
                <TableCell>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => onEdit(ingredient)}
                  >
                    <Edit className='h-4 w-4' />
                    <span className='sr-only'>Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-24 text-center text-muted-foreground'
              >
                No ingredients found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
