import React from 'react'
import { Box,  Stack } from '@chakra-ui/react'
import moment from 'moment'
import { Message  } from 'features/types'

export interface MessageBoxProps {
  message: Message
}

export function MessageBox ({ message }: MessageBoxProps) {
  return (
    <Box bg='bw.50' borderRadius='md' p={4} key={message.id}>
      <Stack>
        <Box>
          {message.message}
        </Box>
        {message.timestamp && (
          <Box color='bw.500' fontSize='sm'>
            {moment(message.timestamp).fromNow()}
          </Box>
        )}
      </Stack>
    </Box>
  )
}
