import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react'
import Cookies from 'js-cookie'
// import ReactGA from 'react-ga'
// import * as Sentry from '@sentry/react'
// import posthog from 'posthog-js'

export interface AuthContextValue {
  auth: { userId: string } | null
  loading: boolean
  login: (userId: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  auth: null,
  login: async (userId: string) => {},
  logout: async () => { console.log('demo logout') },
})

export interface AuthProviderProps {
  children: React.ReactNode
  storagePrefix?: string
  domain?: string
}

export function AuthProvider ({ children, storagePrefix = 'spacetime.', domain }: AuthProviderProps) {
  const userIdPath = `${storagePrefix}userId`
  const loginAsUserPath = `${storagePrefix}loginAsUserPath`
  const [auth, setAuth] = useState<AuthContextValue['auth']>(null)
  const [loading, setLoading] = useState(true)
  // const client = useApi()

  const login = useCallback(async (userId: string) => {
    Cookies.set(userIdPath, userId, { domain })
    if (userId) Cookies.set(userIdPath, userId, { domain })
    // if (userId) posthog.identify(userId, { email })
    // if (email) Sentry.setUser({ email, id: userId })
    setAuth({ userId })
    // ReactGA.ga('event', 'login')
  }, [domain, userIdPath])

  const logout = useCallback(async () => {
    Cookies.remove(userIdPath, { domain })
    Cookies.remove(loginAsUserPath, { domain })
    // posthog.reset()
    // client.cache.reset()
    // Sentry.setUser(null)
    setAuth(null)
  }, [domain, userIdPath, loginAsUserPath])

  useEffect(() => {
    const userId = Cookies.get(userIdPath)
    setLoading(false)
    if (userId) setAuth({ userId })
  }, [userIdPath])

  const value = useMemo(() => ({
    auth,
    loading,
    login,
    logout,
  }), [auth, loading, login, logout])

  return (
    <AuthContext.Provider value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function decodeTokenUserId (token?: string|null) {
  if (!token) return null
  try {
    const base = token.split('.').pop()
    if (!base) return
    return JSON.parse(window.atob(base))?.id
  } catch (e) {
    return null
  }
}
