import React from 'react'
import { Box, Heading,  Container, VStack } from '@chakra-ui/react'
// import { Link } from 'react-router-dom'
import { Layout } from 'features/common/Layout'

export function ProfileDetail () {
  return (
    <Layout>
      <VStack>
        <Container size='lg' p={4}>
          <Box>
            <Heading>
              Calum
            </Heading>
          </Box>
        </Container>
      </VStack>
    </Layout>
  )
}
