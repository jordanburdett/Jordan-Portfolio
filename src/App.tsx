import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./Navigation/NavBar/NavBar";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <NavBar />
    </ChakraProvider>
  );
};

export default App;
