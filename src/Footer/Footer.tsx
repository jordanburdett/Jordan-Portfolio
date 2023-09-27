import { Container, Stack, ButtonGroup, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'

type Props = {}

const Footer = (props: Props) => {
  return (
    <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="space-between" direction="row" align="center">
        <ButtonGroup variant="tertiary">
          <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin />} />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub />} />
          <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="fg.subtle">
        &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights reserved.
      </Text>
    </Stack>
  </Container>
  )
}

export default Footer