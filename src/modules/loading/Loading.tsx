import React, { useState, useEffect, useRef } from 'react'
import { Spinner, SpinnerProps, Center } from '@chakra-ui/react'

export interface LoadingProps extends SpinnerProps {
  loading?: boolean
  center?: boolean
  delay?: number
}

export const Loading: React.FC<LoadingProps> = ({ loading, center, children, delay = 100, ...props }) => {
  const [localLoading, setLocalLoading] = useState<boolean|null>(null)
  const timer = useRef<null|number>(null)

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current)
    if (!loading || !delay) {
      setLocalLoading(!!loading)
    } else {
      timer.current = window.setTimeout(() => {
        setLocalLoading(!!loading)
      }, delay)
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [loading, delay])

  if (localLoading) {
    if (center) {
      return (
        <Center>
          <Spinner
            thickness='5px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Center>
      )
    }
    return (
      <Spinner emptyColor='gray.200' color='blue.500' size='md' {...props} />
    )
  }

  if (localLoading === null) return null

  return <>{children}</>
}
