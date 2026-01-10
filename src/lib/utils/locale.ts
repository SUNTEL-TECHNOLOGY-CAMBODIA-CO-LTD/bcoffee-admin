export type LocalizedText = Record<string, string>

export function getLocalized(
  text: LocalizedText | undefined | null,
  locale: string = 'en'
): string {
  if (!text) return ''

  // Try the requested locale
  if (text[locale]) return text[locale]

  // Fallback to 'en'
  if (text['en']) return text['en']

  // Fallback to the first available key if any
  const keys = Object.keys(text)
  if (keys.length > 0) return text[keys[0]]

  return ''
}
