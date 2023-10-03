import React from "react";
import NavBar from "../../Navigation/NavBar/NavBar";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <>
      <NavBar />
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
        <Heading size={{ base: "xs", md: "sm" }} margin={"20px"}>
            If you have any questions about my projects or think I would be a good fit reach out below.
          </Heading>
          <Heading size={{ base: "xs", md: "sm" }}>
            Call or Text: 801-725-5109
          </Heading>
          <Heading size={{ base: "xs", md: "sm" }}>
            Email: jordan@burdett.us
          </Heading>
        </Stack>
      </Container>
    </>
  );
};

export default Contact;
