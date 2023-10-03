import {
  Container,
  Stack,
  ButtonGroup,
  IconButton,
  Text,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      as="footer"
      role="contentinfo"
      py={{ base: "12", md: "16" }}
      marginTop="auto"
    >
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="tertiary">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/jordan-burdett/"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
            />
            <IconButton
              as="a"
              href="https://github.com/jordanburdett"
              aria-label="GitHub"
              icon={<FaGithub />}
            />
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button>
            <Text as="button" fontSize="sm" color="fg.subtle" onClick={toggleColorMode}>
              &copy; {new Date().getFullYear()} Created By Jordan Burdett
            </Text>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;
