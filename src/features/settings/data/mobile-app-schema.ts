import { z } from 'zod'

export const mobileAppVersionSchema = z.object({
  id: z.string(),
  platform: z.enum(['ios', 'android']),
  latestVersion: z.string(),
  minUsableVersion: z.string(),
  updateUrl: z.string().url(),
  updatedAt: z.string(), // ISO date string
})

export type MobileAppVersion = z.infer<typeof mobileAppVersionSchema>

export const MOCK_MOBILE_APP_VERSIONS: MobileAppVersion[] = [
  {
    id: '1',
    platform: 'ios',
    latestVersion: '2.1.0',
    minUsableVersion: '2.0.0',
    updateUrl: 'https://apps.apple.com/us/app/bcoffee/id123456789',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    platform: 'android',
    latestVersion: '2.1.0',
    minUsableVersion: '2.0.0',
    updateUrl: 'https://play.google.com/store/apps/details?id=com.bcoffee.app',
    updatedAt: new Date().toISOString(),
  },
]
