import React from "react";
import "./App.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import NavBar from "./Navigation/NavBar/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Content/Home/Home";
import About from "./Content/About/About";
import Portfolio from "./Content/Portfolio/Portfolio";
import Resume from "./Content/Resume/Resume";
import Contact from "./Content/Contact/Contact";
import Footer from "./Footer/Footer";
import { extendTheme } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      <Footer />
    </ChakraProvider>
  );
};

export default App;
