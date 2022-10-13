import React, { useState } from 'react'
import { Box, Heading,  Container, VStack, Stack, Input, HStack, Button } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { map } from 'lodash'
import moment from 'moment'
import { Layout } from 'features/common/Layout'
import { useCollection, useDocument, usePolybase } from '@polybase/react'
import { Message, User } from 'features/types'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from 'features/users/useAuth'
import { useAsyncCallback } from 'modules/common/useAsyncCallback'
import { MessageBox } from 'features/message/Message'

export function ProfileDetail () {
  const [msg, setMsg] = useState('')
  const { account } = useParams()
  const polybase = usePolybase()

  const { auth } = useAuth()

  const { data } = useDocument<User>(
    account ? polybase.collection('demo/social/users').doc(account) : null,
  )

  const { data: messages } = useCollection<Message>(
    account
      ? polybase.collection('demo/social/messages')
        .where('account', '==', account)
        .sort('timestamp', 'desc')
      : null,
  )

  const share = useAsyncCallback(async (e) => {
    e.preventDefault()
    const pk = auth?.wallet?.getPublicKeyString()
    if (!pk) throw new Error('You must be logged in to share a message')
    await polybase.collection<Message>('demo/social/messages').doc(nanoid()).set({
      message: msg,
      account,
      timestamp: moment().toISOString(),
    }, [pk])
    setMsg('')
  })

  const messagesEl = map(messages?.data, ({ data }) => {
    return (
      <MessageBox message={data} />
    )
  })

  return (
    <Layout>
      <VStack>
        <Container maxW='xl' p={4}>
          <Stack spacing={8}>
            <Box>
              <Stack>
                <Heading>
                  {data?.data?.name ?? 'Annon'}{auth?.account === account ? ' (You)' : ''}
                </Heading>
                <Heading size='sm' color='bw.600' fontWeight='normal'>
                  {data?.data?.id} {auth?.account === account && <Link to='/profiles/edit'>[edit]</Link>}
                </Heading>
              </Stack>
            </Box>

            <Box>
              <Stack spacing={3}>
                <Heading size={'md'}>Messages</Heading>
                {auth?.account === account && (
                  <form onSubmit={share.execute}>
                    <HStack>
                      <Input value={msg} placeholder='Write something...' onChange={(e) => setMsg(e.target.value)} />
                      <Button type='submit' isLoading={share.loading} onClick={share.execute}>Share</Button>
                    </HStack>
                  </form>
                )}
                <Stack>
                  {messagesEl}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </VStack>
    </Layout>
  )
}
