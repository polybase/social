import { useEffect } from 'react'
import posthog from 'posthog-js'
import { useAuth } from 'features/users/useAuth'

export default function PostHogUserIdentification() {
  const { auth } = useAuth()

  useEffect(() => {
    if (auth?.account) {
      posthog.identify(auth?.account /* { email: user.email } */)
    } else {
      posthog.reset()
    }
  }, [auth?.account])

  return null
}
