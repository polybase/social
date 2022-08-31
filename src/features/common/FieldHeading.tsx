import { Heading, HeadingProps } from '@chakra-ui/react'

export function FieldHeading (props: HeadingProps) {
  return (
    <Heading size='xs' color='gray.400' textTransform='uppercase' {...props} />
  )
}