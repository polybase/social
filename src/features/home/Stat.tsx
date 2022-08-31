import { Box, Heading, Stack, Flex, Spacer } from '@chakra-ui/react'

export interface StatProps {
  title: string
  stat: number|string
}

export function Stat ({ title, stat }: StatProps) {
  return (
    <Stack bg='bw.50' borderRadius='lg' p={8} flex='1 1 auto' spacing={3}>
      <Flex display='flex'>
        <Heading size='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' float='left'>
          {stat}
        </Heading>
        <Spacer />
      </Flex>
      <Box px={3}>
        <Heading size='md' color='bw.800' textTransform='uppercase'>{title}</Heading>
      </Box>
    </Stack>
  )
}
