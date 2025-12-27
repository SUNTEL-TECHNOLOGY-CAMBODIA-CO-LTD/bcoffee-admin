export enum SurchargeType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export interface Surcharge {
  id: string
  name: { en: string }
  type: SurchargeType
  value: number
  isTax: boolean
  isAutoApplied: boolean
  isActive: boolean
}

export const MOCK_SURCHARGES: Surcharge[] = [
  {
    id: 'sc_vat',
    name: { en: 'VAT 10%' },
    type: SurchargeType.PERCENTAGE,
    value: 10,
    isTax: true,
    isAutoApplied: true,
    isActive: true,
  },
  {
    id: 'sc_service',
    name: { en: 'Service Charge' },
    type: SurchargeType.PERCENTAGE,
    value: 5,
    isTax: false,
    isAutoApplied: true,
    isActive: true,
  },
]

export interface UnitOfMeasure {
  id: string
  name: string
  symbol: string
  baseMultiplier: number
}

export const MOCK_UNITS: UnitOfMeasure[] = [
  {
    id: 'u_g',
    name: 'Gram',
    symbol: 'g',
    baseMultiplier: 1,
  },
  {
    id: 'u_kg',
    name: 'Kilogram',
    symbol: 'kg',
    baseMultiplier: 1000,
  },
  {
    id: 'u_ml',
    name: 'Milliliter',
    symbol: 'ml',
    baseMultiplier: 1,
  },
  {
    id: 'u_l',
    name: 'Liter',
    symbol: 'L',
    baseMultiplier: 1000,
  },
]
