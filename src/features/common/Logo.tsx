import React from 'react'
import {
  HStack, Img, Link,
} from '@chakra-ui/react'
import logo from 'img/logo.svg'

export interface LogoProps {
  to?: string|null
  external?: boolean
}

export function Logo ({ to, external }: LogoProps) {
  const logoEl = (
    <HStack spacing={1}>
      <Img src={logo} height={'48px'} />
    </HStack>
  )
  return to ? <Link isExternal={external} href={to}>{logoEl}</Link> : logoEl
}
