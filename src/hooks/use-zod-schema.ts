import { useMemo } from 'react'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

export function useZodSchema<T extends z.ZodTypeAny>(
  schemaFn: (t: (key: string) => string) => T,
  deps: unknown[] = []
) {
  const { t } = useTranslation()

  return useMemo(() => {
    return schemaFn(t)
  }, [t, ...deps])
}
