import { Stack, Box,  Container, VStack, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useSpacetime, useCollection } from '@spacetimexyz/react'
import { map } from 'lodash'
import { Layout } from 'features/common/Layout'
import { User } from 'features/types'
import { useAuth } from 'features/users/useAuth'

export function Home () {
  const spacetime = useSpacetime()

  const { auth } = useAuth()
  const { data } = useCollection<User>(spacetime.collection('demo/social/users'))

  const usersEl = map(data, ({ data }) => {
    return (
      <Link to={`/profiles/${data.id}`} key={data.id}>
        <Box borderRadius='md' bg='bw.50' p={4}>
          <Stack>
            <Heading size='md'>
              {data?.name ?? 'Annon'}{auth?.account === data.account ? ' (You)' : ''}
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
      <VStack>
        <Container size='lg' p={4}>
          <Box>
            <Stack spacing='6'>
              {usersEl}
            </Stack>
          </Box>
        </Container>
      </VStack>
    </Layout>
  )
}

