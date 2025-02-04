import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
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
import { trackPageVisit, updateTimeSpent } from "./Helpers/StatisticsHelper";

// RouteTracker component to handle page view tracking
const RouteTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  React.useEffect(() => {
    const startTime = Date.now();
    const currentRoute = location.pathname;

    // Track the initial page visit
    trackPageVisit(currentRoute, null);

    return () => {
      const timeSpent = (Date.now() - startTime) / 1000; // Convert to seconds
      updateTimeSpent(currentRoute, timeSpent);
    };
  }, [location.pathname]);

  return <>{children}</>;
};

// Wrapper component for routes that need tracking
const withRouteTracking = (Component: React.ComponentType) => {
  return function WrappedComponent() {
    return (
      <RouteTracker>
        <Component />
      </RouteTracker>
    );
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: withRouteTracking(Home)(),
  },
  {
    path: "/home",
    element: withRouteTracking(Home)(),
  },
  {
    path: "/about",
    element: withRouteTracking(About)(),
  },
  {
    path: "/portfolio",
    element: withRouteTracking(Portfolio)(),
  },
  {
    path: "/resume",
    element: withRouteTracking(Resume)(),
  },
  {
    path: "/contact",
    element: withRouteTracking(Contact)(),
  },
  {
    path: "/dashboard",
    element: withRouteTracking(Dashboard)(),
  },
  {
    path: "/login",
    element: withRouteTracking(Login)(),
  },
  {
    path: "/dashboard/infocardedit",
    element: withRouteTracking(InfoCardEdit)(),
  },
  {
    path: "/dashboard/projectsedit",
    element: withRouteTracking(ProjectsEdit)(),
  },
  {
    path: "/dashboard/aboutedit",
    element: withRouteTracking(AboutEdit)(),
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
