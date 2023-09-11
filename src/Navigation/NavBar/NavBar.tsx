import React from "react";
import {
  HStack,
  Link,
  Box,
  Text,
  Icon,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { FaMountain, FaFolder } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";
import { MdEmail } from "react-icons/md";


const NavBar = () => {
  return (
    <HStack spacing="8" >
      <Box p="2" paddingLeft={"10"}>
        <Link href="/">
          <HStack>
            <Icon as={AiFillHome} fontSize={"20px"}/>
            <Text fontSize={"xl"}>Home</Text>
          </HStack>
        </Link>
      </Box>
      <Box p="2">
        <Link href="/about">
        <HStack>
            <Icon as={FaMountain} fontSize={"20px"}/>
            <Text fontSize={"xl"}>About</Text>
          </HStack>
        </Link>
      </Box>
      <Box p="2">
        <Link href="/portfolio">
        <HStack>
            <Icon as={FaFolder} fontSize={"20px"}/>
            <Text fontSize={"xl"}>Portfolio</Text>
          </HStack>
        </Link>
      </Box>
      <Box p="2">
        <Link href="/resume">
        <HStack>
            <Icon as={HiDocument} fontSize={"20px"}/>
            <Text fontSize={"xl"}>Resume</Text>
          </HStack>
        </Link>
      </Box>
      <Box p="2">
        <Link href="/contact">
        <HStack>
            <Icon as={MdEmail} fontSize={"20px"}/>
            <Text fontSize={"xl"}>Contact</Text>
          </HStack>
        </Link>
      </Box>
    </HStack>
  );
};

export default NavBar;
