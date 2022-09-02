import React from 'react'
import { Loading } from 'modules/loading/Loading'
import {
  Box, Flex, Button, Spacer, HStack, Heading,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { useAuth } from 'features/users/useAuth'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { useLogin } from 'features/users/useLogin'

export interface LayoutProps {
  children?: React.ReactNode|React.ReactNode[]
  logoLink?: string
  logoLinkExternal?: boolean
  isLoading?: boolean
  hideAuthBtns?: boolean
}

export function Layout ({ children, isLoading, logoLink, logoLinkExternal, hideAuthBtns }: LayoutProps) {
  const { auth, loading, logout } = useAuth()
  const login = useLogin()

  return (
    <Flex height='100%' flexDirection='column'>
      <HStack p={4}>
        <Link to='/'>

          <HStack>
            <Logo to={logoLink} external={logoLinkExternal} />
            <Heading as='h1' size='lg'>Social</Heading>
          </HStack>
        </Link>
        <Spacer />
        {!hideAuthBtns && (
          <HStack spacing={2}>
            <ColorModeSwitcher />
            {!auth && !loading && (
              <Button onClick={login}>Login</Button>)}
            {auth && !loading && (
              <Button onClick={async () => {
                await logout()
                // navigate('/')
              }}>Logout</Button>
            )}
          </HStack>
        )}

      </HStack>
      <Box flex='1 1 auto'>
        {isLoading
          ? (
            <Box mt={10} >
              <Loading loading center data-test='layout-loading' />
            </Box>
          )
          : children}
      </Box>
    </Flex>
  )
}
