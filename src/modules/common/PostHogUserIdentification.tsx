import { useEffect } from 'react'
import posthog from 'posthog-js'
import { useAuth } from 'features/users/useAuth'

export default function PostHogUserIdentification () {
  const { auth } = useAuth()
  const userId = auth?.userId

  useEffect(() => {
    if (userId) {
      posthog.identify(userId /* { email: user.email } */)
    } else {
      posthog.reset()
    }
  }, [userId])

  return null
}
