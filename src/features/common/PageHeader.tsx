import { Flex, Heading, Spacer } from '@chakra-ui/react'

export interface PageHeaderProps {
  heading: string
  children?: React.ReactNode
}

export function PageHeader ({ heading, children }: PageHeaderProps) {
  return (
    <Flex bg='#fff' flex='0 0 auto' p={2} height='57px' borderBottom='1px solid #EDEDED'>
      <Flex alignItems='center' height='100%' px={1}>
        <Heading fontSize='1.3em'>{heading}</Heading>
      </Flex>
      <Spacer />
      <Flex alignItems='center' height='100%' px={1}>
        {children}
      </Flex>
    </Flex>
  )
}