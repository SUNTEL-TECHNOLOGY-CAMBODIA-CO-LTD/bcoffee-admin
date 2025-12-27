export interface Ingredient {
  id: string
  name: string
  unit: string
  costPerUnit: number
}

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 'ing_beans', name: 'Espresso Beans', unit: 'grams', costPerUnit: 0.02 },
  { id: 'ing_milk', name: 'Whole Milk', unit: 'ml', costPerUnit: 0.0015 },
  { id: 'ing_sugar', name: 'Sugar', unit: 'grams', costPerUnit: 0.005 },
  {
    id: 'ing_syrup_vanilla',
    name: 'Vanilla Syrup',
    unit: 'pump',
    costPerUnit: 0.2,
  },
  { id: 'ing_water', name: 'Water', unit: 'ml', costPerUnit: 0 },
]
