import React from "react";
import NavBar from "../../Navigation/NavBar/NavBar";
import { Box, Container, Flex, HStack, Image, Text } from "@chakra-ui/react";

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <NavBar />
      <Flex flexWrap={"wrap"} margin={"20px"} justifyContent={"center"}>
        <Box maxWidth="800px" minWidth="300px">
          <Image src={"https://fakeimg.pl/1600x900"} alt={"me"} marginBottom={"30px"}/>
        </Box>
        <Box margin={"0 30px"}>
          <Text maxWidth={"600px"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            mollitia, voluptate nihil vero veniam rerum unde iste, inventore
            possimus reiciendis, nisi quo quia! Dicta, odit? Quam sint minus
            provident incidunt.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            mollitia, voluptate nihil vero veniam rerum unde iste, inventore
            possimus reiciendis, nisi quo quia! Dicta, odit? Quam sint minus
            provident incidunt.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            mollitia, voluptate nihil vero veniam rerum unde iste, inventore
            possimus reiciendis, nisi quo quia! Dicta, odit? Quam sint minus
            provident incidunt.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default About;
