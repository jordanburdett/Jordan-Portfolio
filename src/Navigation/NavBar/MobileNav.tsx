import { useState } from "react";
import {
  HStack,
  Icon,
  Box,
  Text,
  Flex,
  useColorModeValue,
  Collapse,
  Circle,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import navItems from "../Data/navItems";
import { Link } from "react-router-dom";

// The last Box element should conatin drawer fuctionality with the same elements from desktopnav
const MobileNav = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const hamburgerClicked = () => {
    setMenuExpanded((prev) => !prev);
  };

  const navColors = useColorModeValue("gray.100", "gray.900");
  const monogramBg = useColorModeValue("gray.700", "gray.200");
  const monogramColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <Flex bg={navColors} position="relative" h="60px" alignItems="center">
        <Box p="3" position="absolute" left="0">
          <HStack>
            <Text fontSize={"xl"}>Jordan</Text>
          </HStack>
        </Box>
        
        <Center flex="1">
          <Circle 
            size="40px" 
            bg={monogramBg} 
            color={monogramColor}
            fontSize="lg"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="tight"
          >
            JB
          </Circle>
        </Center>

        <Box
          p="3"
          position="absolute"
          right="0"
          onClick={hamburgerClicked}
          _hover={{ background: "lightgray" }}
          cursor="pointer"
        >
          <Icon
            as={menuExpanded ? CloseIcon : HamburgerIcon}
            w={6}
            h={6}
          />
        </Box>
      </Flex>

      <Flex flexWrap={"wrap"} bg={navColors}>
        <Collapse
          in={menuExpanded}
          animateOpacity
          style={{ flexWrap: "wrap", width: "100%" }}
        >
          {navItems.map((item) => (
            <Box p="3" width="100%" key={item.name}>
              <Link to={item.href}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Text
                    fontSize={"xl"}
                    marginRight={"40px"}
                    marginLeft={"auto"}
                  >
                    {item.name}
                  </Text>
                </div>
              </Link>
            </Box>
          ))}
        </Collapse>
      </Flex>
    </>
  );
};

export default MobileNav;
