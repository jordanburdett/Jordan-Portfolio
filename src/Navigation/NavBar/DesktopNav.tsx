import React from "react";
import { Box, HStack, Icon, Text, Link, useColorModeValue } from "@chakra-ui/react";
import navItems from "../Data/navItems";

const DesktopNav = () => {
  const navColors = useColorModeValue("gray.100", "gray.900");
  return (
    <HStack
      spacing="8"
      justifyContent={"right"}
      paddingLeft={"20"}
      paddingRight={"20"}
      bg={navColors}
    >
      <Box
        p="3"
        marginRight={"auto"}
        flexWrap={"nowrap"}
        display={{ base: "none", xl: "flex" }}
      >
        <Text fontSize={"2xl"}>Jordan Burdett Portfolio</Text>
      </Box>
      {navItems.map((item) => (
        <Box p="3" key={item.name}>
          <Link href={item.href} >
            <HStack>
              <Icon as={item.Icon} fontSize={"20px"} />
              <Text fontSize={"xl"}>{item.name}</Text>
            </HStack>
          </Link>
        </Box>
      ))}
    </HStack>
  );
};

export default DesktopNav;
