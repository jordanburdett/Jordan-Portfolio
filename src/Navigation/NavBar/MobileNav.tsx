import React, { useState } from "react";
import {
  HStack,
  Icon,
  Box,
  Link,
  Text,
  Flex,
  useColorModeValue,
  Slide,
  Collapse,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { FaHamburger } from "react-icons/fa";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

type Props = {};

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Resume",
    href: "/resume",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

// The last Box element should conatin drawer fuctionality with the same elements from desktopnav
const MobileNav = (props: Props) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const hamburgerClicked = () => {
    setMenuExpanded((prev) => !prev);
  };

  const navColors = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <HStack spacing="8" justifyContent={"space-between"} bg={navColors}>
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
          {menuExpanded && <Icon as={CloseIcon} fontSize={"20px"} />}
          {!menuExpanded && <Icon as={HamburgerIcon} fontSize={"20px"} />}
        </Box>
      </HStack>

      <Flex flexWrap={"wrap"} bg={navColors}>
        <Collapse in={menuExpanded} animateOpacity style={{flexWrap: "wrap", width: "100%"}}>
          {navItems.map((item) => (
            <Box p="3" width="100%" key={item.name}>
              <Link href={item.href} display="flex">
                <Text fontSize={"xl"} marginRight={"40px"} marginLeft={"auto"}>
                  {item.name}
                </Text>
              </Link>
            </Box>
          ))}
        </Collapse>
      </Flex>
    </>
  );
};

export default MobileNav;
