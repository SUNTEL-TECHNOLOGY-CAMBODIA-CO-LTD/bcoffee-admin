import { DEFAULT_LOCALE } from '@/config/locales'

/**
 * Retrieves the translation for a specific locale from a multi-language object.
 * Falls back to the default locale (en) or the first available key if the requested locale is missing.
 *
 * @param value - The multi-language object (e.g., { en: 'Hello', km: '...' })
 * @param locale - The desired locale code
 * @returns The translated string or an empty string if valid input is not provided
 */
export function getTranslation(
  value: Record<string, string> | null | undefined,
  locale: string = DEFAULT_LOCALE
): string {
  if (!value || typeof value !== 'object') {
    return ''
  }

  // 1. Try exact match
  if (value[locale]) {
    return value[locale]
  }

  // 2. Try default locale
  if (value[DEFAULT_LOCALE]) {
    return value[DEFAULT_LOCALE]
  }

  // 3. Fallback to the first available key
  const keys = Object.keys(value)
  if (keys.length > 0) {
    return value[keys[0]]
  }

  return ''
}
