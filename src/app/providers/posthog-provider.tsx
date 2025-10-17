'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY!) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: '/ingest', // Use rewrite path defined in next.config.ts
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST!,
        person_profiles: 'always',
        defaults: '2025-05-24',
        debug: process.env.NODE_ENV === 'development',
      })
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}