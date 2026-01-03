export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'km', label: 'Khmer', flag: '🇰🇭' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
] as const

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number]['code']

// The default fallback if a translation is missing
export const DEFAULT_LOCALE: LocaleCode = 'en'
