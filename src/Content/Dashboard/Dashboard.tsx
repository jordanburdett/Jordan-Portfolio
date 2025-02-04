import { Button, Stack, Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "@chakra-ui/react";
import NavBar from "../../Navigation/NavBar/NavBar";
import Statistics from "./Statistics/Statistics";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      console.log("user effect ran in dashboard");
      navigate("/login");
    }
  });

  const infoCardEditClick = () => {
    navigate("/dashboard/infocardedit");
  };

  const projectsEditButton = () => {
    navigate("/dashboard/projectsedit");
  };

  const aboutEditButton = () => {
    navigate("/dashboard/aboutedit");
  };

  return (
    <>
      <NavBar />
      <Stack divider={<Divider />} spacing={4} margin={"20px"}>
        <Button onClick={infoCardEditClick}>Info Card Edit</Button>
        <Button onClick={projectsEditButton}>Projects Edit</Button>
        <Button onClick={aboutEditButton}>About Edit</Button>
        <Box p={4}>
          <VStack spacing={4} align="stretch">
            <Statistics />
          </VStack>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
