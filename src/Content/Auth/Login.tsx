import {
  Container,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Checkbox,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import NavBar from "../../Navigation/NavBar/NavBar";
import { useState } from "react";
import { userSignIn } from "../../Helpers/APIUserHelper";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const signInButtonClick = async () => {
    
    if (email === "" || password === "") { 
        return;
    }

    const result = await userSignIn(email, password);
    if (result.success) {
        localStorage.setItem("token", result.token);
        Navigate("/dashboard");
    }
    else {
        console.log("Login Failed");
    }

  };

  return (
    <>
      <NavBar />
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>Login</Heading>
              <Text color="fg.muted">
                This login is for admin purposes only
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" onChange={(event) => {
                    setPassword(event.target.value);
                  }}/>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
              </HStack>
              <Stack spacing="6">
                <Button onClick={signInButtonClick}>Sign in</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
