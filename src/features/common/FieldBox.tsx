import React, { useState } from 'react'
import { Stack, Center, Flex, BoxProps, HStack, Spacer, IconButton } from '@chakra-ui/react'
import { MdRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FieldHeading } from './FieldHeading'

export interface FieldBoxProps extends BoxProps {
  heading?: string
  value?: string|null
  secret?: boolean
  children?: React.ReactChild
  to?: string
}

export function FieldBox ({ heading, value, children, to, secret, ...props }: FieldBoxProps) {
  const [showSecret, setShowSecret] = useState(false)
  const childEl = (
    <Stack cursor={to ? 'pointer' : undefined} spacing={1} {...props}>
      {heading ? <FieldHeading>{heading}</FieldHeading> : null}
      <Flex alignItems='center' height='38px'>
        {children ?? (
          <HStack spacing={2} bg='gray.50' borderRadius='md' p={2} fontSize='sm' color='gray.800' width='100%'>
            <Center position='relative' top={showSecret ? 0 : '2px'}>
              {secret && !showSecret ? '*'.repeat(value?.length ?? 10) : value}
            </Center>
            <Spacer />
            {secret && (
              <IconButton variant='ghost' size='xs' aria-label='Show secret' icon={<MdRemoveRedEye />} onClick={() => setShowSecret((show) => !show)} />
            )}
          </HStack>
        )}
      </Flex>
    </Stack>
  )

  if (!to) return childEl

  return (
    <Link to={to}>
      {childEl}
    </Link>
  )
}