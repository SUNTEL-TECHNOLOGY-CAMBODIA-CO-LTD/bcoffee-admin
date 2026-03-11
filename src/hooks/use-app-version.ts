import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const CURRENT_VERSION = import.meta.env.VITE_APP_VERSION
const CHECK_INTERVAL = 60

export const useAppVersion = () => {
  const [secondsUntilCheck, setSecondsUntilCheck] = useState(CHECK_INTERVAL)

  useEffect(() => {
    const checkVersion = async () => {
      setSecondsUntilCheck(CHECK_INTERVAL)
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, {
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()

        if (
          data.version &&
          data.version !== CURRENT_VERSION &&
          sessionStorage.getItem('last_seen_version') !== data.version
        ) {
          // eslint-disable-next-line no-console
          console.log(
            `New version detected! (${CURRENT_VERSION} -> ${data.version})`
          )
          sessionStorage.setItem('last_seen_version', data.version)

          const hardReload = async () => {
            // Unregister all service workers so they don't serve stale cached index.html
            if ('serviceWorker' in navigator) {
              const registrations =
                await navigator.serviceWorker.getRegistrations()
              await Promise.all(registrations.map((r) => r.unregister()))
            }
            // Clear all SW caches
            if ('caches' in window) {
              const keys = await caches.keys()
              await Promise.all(keys.map((k) => caches.delete(k)))
            }
            window.location.replace('/')
          }

          const forceReloadTimer = setTimeout(
            () => void hardReload(),
            30 * 1000
          )

          toast('New version available', {
            description: 'A new update is ready. Auto-updating in 30 seconds.',
            duration: 30 * 1000,
            action: {
              label: 'Update now',
              onClick: () => {
                clearTimeout(forceReloadTimer)
                void hardReload()
              },
            },
          })
        }
      } catch (_err) {
        // Silently ignore fetch failures (e.g. offline, 404 during deployment swap)
      }
    }

    // Countdown ticker
    const ticker = setInterval(() => {
      setSecondsUntilCheck((s) => (s <= 1 ? CHECK_INTERVAL : s - 1))
    }, 1000)

    const interval = setInterval(checkVersion, CHECK_INTERVAL * 1000)
    checkVersion()

    return () => {
      clearInterval(ticker)
      clearInterval(interval)
    }
  }, [])

  return { secondsUntilCheck }
}
