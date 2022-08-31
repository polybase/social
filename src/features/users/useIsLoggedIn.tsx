import { useAuth } from './useAuth'

export function useIsLoggedIn () {
  const { auth, loading } = useAuth()
  return [!!auth, loading]
}
