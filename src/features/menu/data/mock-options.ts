import { OptionType, type ProductOptionGroup } from './schema'

export const MOCK_OPTION_GROUPS: ProductOptionGroup[] = [
  {
    id: 'grp_milk_alt',
    sku: 'GRP-MILK-ALT',
    name: 'Milk Alternatives',
    type: OptionType.MODIFIER,
    minSelect: 0,
    maxSelect: 1,
    options: [
      {
        sku: 'OPT-OAT-MILK',
        name: { en: 'Oat Milk' },
        price: 0.5,
      },
      {
        sku: 'OPT-SOY-MILK',
        name: { en: 'Soy Milk' },
        price: 0.5,
      },
      {
        sku: 'OPT-ALMOND-MILK',
        name: { en: 'Almond Milk' },
        price: 0.5,
      },
    ],
  },
  {
    id: 'grp_syrups',
    sku: 'GRP-SYRUPS',
    name: 'Syrups',
    type: OptionType.ADDON,
    minSelect: 0,
    maxSelect: 5,
    options: [
      {
        sku: 'OPT-VANILLA',
        name: { en: 'Vanilla' },
        price: 0.3,
      },
      {
        sku: 'OPT-CARAMEL',
        name: { en: 'Caramel' },
        price: 0.3,
      },
    ],
  },
]
