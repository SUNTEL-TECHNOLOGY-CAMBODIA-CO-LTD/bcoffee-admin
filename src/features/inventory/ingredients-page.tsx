import { useState } from 'react'
import { type Ingredient } from '@/types/inventory'
import { PageTitle } from '@/components/page-title'
import { IngredientSheet } from './components/ingredient-sheet'
import { IngredientsTable } from './components/ingredients-table'

export default function IngredientsPage() {
  const [open, setOpen] = useState(false)
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null)

  const handleEdit = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedIngredient(null)
    setOpen(true)
  }

  return (
    <div className='p-6'>
      <PageTitle
        title='Ingredients'
        subtitle='Manage your ingredients inventory.'
        buttonLabel='Add Ingredient'
        onClick={handleCreate}
      />

      <IngredientsTable onEdit={handleEdit} />

      <IngredientSheet
        open={open}
        onOpenChange={(val) => {
          setOpen(val)
          if (!val) setSelectedIngredient(null)
        }}
        initialData={selectedIngredient}
      />
    </div>
  )
}
