import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CollectionSheet } from '../components/collection-sheet'
import { CollectionsTable } from '../components/collections-table'
import { MOCK_COLLECTIONS, type Collection } from '../data/collection-schema'

export default function CollectionsPage() {
  const [data, setData] = useState<Collection[]>(MOCK_COLLECTIONS)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  )

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection)
    setSheetOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      setData((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleCreate = () => {
    setEditingCollection(null)
    setSheetOpen(true)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (formData: any) => {
    if (editingCollection) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingCollection.id
            ? {
                ...item,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            : item
        )
      )
    } else {
      const newCollection: Collection = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...formData,
      }
      setData((prev) => [...prev, newCollection])
    }
    setSheetOpen(false)
    setEditingCollection(null)
  }

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open)
    if (!open) {
      setEditingCollection(null)
    }
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between space-y-2 p-4 md:p-8'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Curated Collections
          </h2>
          <p className='text-muted-foreground'>
            Create and manage product collections like "Trending Now" or
            "Specials".
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Button onClick={handleCreate}>
            <Plus className='mr-2 h-4 w-4' />
            Add Collection
          </Button>
        </div>
      </div>
      <div className='flex-1 flex-col space-y-8 p-8 pt-4'>
        <CollectionsTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <CollectionSheet
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
        collection={editingCollection}
        onSave={handleSave}
      />
    </div>
  )
}
