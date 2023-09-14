import {  Center, Text, VStack, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate();

  const onProjectClick = () => {
    // using react router dom to navigate to the portfolio page
    navigate("/portfolio");
  }
  return (
    <Center bgColor={"blue.500"} height={"400px"}>
      <VStack>
        <Text fontSize="3xl" color="white">Jordan Burdett</Text>
        <Text fontSize="3xl" color="white">Portfolio</Text>
        <Button onClick={onProjectClick}>Click here to view my projects</Button>
      </VStack>
    </Center>
  )
}

export default Home