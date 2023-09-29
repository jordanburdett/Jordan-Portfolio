import React from "react";
import { Box, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import navItems from "../Data/navItems";
import { Link } from "react-router-dom";



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
          <Link to={item.href} >
            <HStack>
              <Text fontSize={"xl"}>{item.name}</Text>
            </HStack>
          </Link>
        </Box>
      ))}
    </HStack>
  );
};

export default DesktopNav;
