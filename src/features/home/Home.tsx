import { Stack, Box,  Container, VStack, Heading, Link as ChakraLink, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { usePolybase, useCollection } from '@polybase/react'
import { map } from 'lodash'
import { Layout } from 'features/common/Layout'
import { User } from 'features/types'
import { useAuth } from 'features/users/useAuth'

export function Home () {
  const polybase = usePolybase()

  const { auth } = useAuth()
  const { data } = useCollection<User>(polybase.collection('demo/social/users'))

  const usersEl = map(data?.data, ({ data }) => {
    return (
      <Link to={`/profiles/${data.id}`} key={data.id}>
        <Box borderRadius='md' bg='bw.50' p={4}>
          <Stack>
            <Heading size='md'>
              {data?.name ?? 'Anon'}{(auth && (auth?.account === data.account)) ? ' (You)' : ''}
            </Heading>
            <Box>
              {data.id}
            </Box>
          </Stack>
        </Box>
      </Link>
    )
  })

  return (
    <Layout>
      <Container size='lg'>
        <VStack align={'left'} spacing={8}>
          <Heading size='lg'>
            Social is a demo app for the <ChakraLink href='https://polybase.xyz'>Polybase</ChakraLink> decentralized database.
          </Heading>
          <Text>
            Many featuers are not implemented or are WIP.
          </Text>
          <Box>
            <Stack spacing='6'>
              {usersEl}
            </Stack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  )
}

