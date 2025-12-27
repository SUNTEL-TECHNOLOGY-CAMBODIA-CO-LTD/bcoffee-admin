import Decimal from 'decimal.js'

export interface IngredientInput {
  ingredientId: string
  costPerUnit: number // e.g., 0.02 (per gram)
  quantityUsed: number // e.g., 18 (grams)
}

export const calculateRecipeCost = (items: IngredientInput[]): number => {
  if (!items || items.length === 0) return 0

  const total = items.reduce((acc, item) => {
    const cost = new Decimal(item.costPerUnit).times(item.quantityUsed)
    return acc.plus(cost)
  }, new Decimal(0))

  return total.toNumber() // Returns precise float (e.g., 0.36)
}

export const calculateMargin = (price: number, cost: number): number => {
  const priceDec = new Decimal(price)
  const costDec = new Decimal(cost)

  if (priceDec.isZero()) return 0

  // Margin % = ((Price - Cost) / Price) * 100
  return priceDec
    .minus(costDec)
    .dividedBy(priceDec)
    .times(100)
    .toDecimalPlaces(1)
    .toNumber()
}
