import React from "react";
import { Box, HStack, Icon, Link, Text } from "@chakra-ui/react";
import navItems from "../Data/navItems";

const DesktopNav = () => {
  return (
    <HStack
      spacing="8"
      justifyContent={"right"}
      marginLeft={"20"}
      marginRight={"20"}
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
          <Link href={item.href}>
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
