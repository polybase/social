import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react'
import Wallet from 'ethereumjs-wallet'
// import ReactGA from 'react-ga'
// import * as Sentry from '@sentry/react'
// import posthog from 'posthog-js'

export interface AuthContextValue {
  auth: { account: string, wallet: Wallet } | null
  loading: boolean
  login: (account: string, wallet: Wallet) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  auth: null,
  login: async (account: string, wallet: Wallet) => {},
  logout: async () => { console.log('demo logout') },
})

export interface AuthProviderProps {
  children: React.ReactNode
  storagePrefix?: string
  domain?: string
}

export function AuthProvider ({ children, storagePrefix = 'polybase.', domain }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthContextValue['auth']>(null)
  const [loading, setLoading] = useState(true)
  // const client = useApi()

  const login = useCallback(async (account: string, wallet: Wallet) => {
    // if (userId) posthog.identify(userId, { email })
    // if (email) Sentry.setUser({ email, id: userId })
    setAuth({ account, wallet })
    // ReactGA.ga('event', 'login')
  }, [])

  const logout = useCallback(async () => {
    // posthog.reset()
    // client.cache.reset()
    // Sentry.setUser(null)
    setAuth(null)
  }, [])

  useEffect(() => {
    // const userId = Cookies.get(userIdPath)
    setLoading(false)
    // if (userId) setAuth({ userId })
  }, [])

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
