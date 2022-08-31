import React, { useState, useEffect, createContext, ReactNode } from 'react'
import axios, { AxiosInstance } from 'axios'
import { useAuth } from 'features/users/useAuth'

export const ApiContext = createContext<AxiosInstance>(axios.create())

export interface ApiProviderProps {
  baseURL?: string
  children: ReactNode|ReactNode[]
}

export function ApiProvider ({ children, baseURL }: ApiProviderProps) {
  const { auth } = useAuth()
  const [client, setClient] = useState<AxiosInstance>(() => axios.create({ baseURL }))

  useEffect(() => {
    if (!auth) return setClient(() => axios.create({ baseURL }))
    setClient(() => axios.create({
      baseURL,
      headers: {
        authorization: `Bearer ${auth.userId}`,
      },
    }))
  }, [auth, baseURL])

  return (
    <ApiContext.Provider value={client}>
      {children}
    </ApiContext.Provider>
  )
}
