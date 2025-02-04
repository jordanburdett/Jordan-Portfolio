import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Content/Home/Home";
import About from "./Content/About/About";
import Portfolio from "./Content/Portfolio/Portfolio";
import Resume from "./Content/Resume/Resume";
import Contact from "./Content/Contact/Contact";
import Footer from "./Footer/Footer";
import { extendTheme } from "@chakra-ui/react";
import Dashboard from "./Content/Dashboard/Dashboard";
import Login from "./Content/Auth/Login";
import InfoCardEdit from "./Content/Dashboard/InfoCardEdit/InfoCardEdit";
import ProjectsEdit from "./Content/Dashboard/ProjectsEdit/ProjectsEdit";
import AboutEdit from "./Content/Dashboard/AboutEdit/AboutEdit";

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
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/infocardedit",
    element: <InfoCardEdit />,
  },
  {
    path: "/dashboard/projectsedit",
    element: <ProjectsEdit />,
  },
  {
    path: "/dashboard/aboutedit",
    element: <AboutEdit />,
  }
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
