import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'

export default function PostHogPageView () {
  const { pathname } = useLocation()
  useEffect(() => {
    posthog.capture('$pageview', { $current_url: pathname })
  }, [pathname])

  return null
}
