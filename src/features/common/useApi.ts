import { useContext } from 'react'
import { ApiContext } from './ApiProvider'

export function useApi () {
  return useContext(ApiContext)
}
