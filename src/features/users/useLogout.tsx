import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function useLogout () {
  const navigate = useNavigate()
  const { logout } = useAuth()
  return useCallback(() => {
    navigate('/')
    return logout()
  }, [navigate, logout])
}
