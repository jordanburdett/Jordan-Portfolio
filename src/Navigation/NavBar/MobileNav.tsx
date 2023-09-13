import { VStack, HStack, Icon, Box, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaHamburger } from "react-icons/fa";

type Props = {};

// The last Box element should conatin drawer fuctionality with the same elements from desktopnav
const MobileNav = (props: Props) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const hamburgerClicked = () => {
    setMenuExpanded(prev => !prev);
  };
  return (
    <>
      <HStack spacing="8" justifyContent={"space-between"}>
        <Box p="3">
          <HStack>
            <Text fontSize={"xl"}>Jordan</Text>
          </HStack>
        </Box>
        <Box p="3">
          <HStack>
            <Text fontSize={"xl"}>Logo Maybe?</Text>
          </HStack>
        </Box>
        <Box
          p="3"
          onClick={hamburgerClicked}
          _hover={{ background: "lightgray" }}
          borderRadius={15}
        >
          <Icon as={FaHamburger} fontSize={"20px"} />
        </Box>
      </HStack>

      {menuExpanded && (
        <VStack>
          <Box>
            <Link href="/">
              <HStack textAlign={"right"} width={"100%"}>
                <Icon as={MdEmail} fontSize={"20px"} />
                <Text fontSize={"xl"}>Home</Text>
              </HStack>
            </Link>
          </Box>
          <Box >
            <Link href="/about">
              <HStack>
                <Icon as={MdEmail} fontSize={"20px"} />
                <Text fontSize={"xl"}>About</Text>
              </HStack>
            </Link>
          </Box>
          <Box >
            <Link href="/portfolio">
              <HStack>
                <Icon as={MdEmail} fontSize={"20px"} />
                <Text fontSize={"xl"}>Portfolio</Text>
              </HStack>
            </Link>
          </Box>
          <Box >
            <Link href="/resume">
              <HStack>
                <Icon as={MdEmail} fontSize={"20px"} />
                <Text fontSize={"xl"}>Resume</Text>
              </HStack>
            </Link>
          </Box>
          <Box >
            <Link href="/contact">
              <HStack>
                <Icon as={MdEmail} fontSize={"20px"} />
                <Text fontSize={"xl"}>Contact</Text>
              </HStack>
            </Link>
          </Box>
        </VStack>
      )}
    </>
  );
};

export default MobileNav;
