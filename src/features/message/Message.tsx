import React from 'react'
import { Box,  HStack,  Stack, Button, Link as ChakraLink, Spacer } from '@chakra-ui/react'
import moment from 'moment'
import { Message  } from 'features/types'

export interface MessageBoxProps {
  message: Message
}


export function MessageBox ({ message }: MessageBoxProps) {
  const link = `https://explorer.testnet.polybase.xyz/collections/demo%2Fsocial%2Fmessages/${message.id}`

  return (
    <Box bg='bw.50' borderRadius='md' p={4} key={message.id}>
      <Stack>
        <Box>
          {message.message}
        </Box>
        <HStack>
          {message.timestamp && (
            <Box color='bw.500' fontSize='sm'>
              {moment(message.timestamp).fromNow()}
            </Box>
          )}
          <Spacer />
          <Button size={'xs'}>
            <ChakraLink isExternal href={link}>
              View on explorer
            </ChakraLink>
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
