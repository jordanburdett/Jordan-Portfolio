import React, { useState } from "react";
import NavBar from "../../Navigation/NavBar/NavBar";
import { Box, Container, Flex, HStack } from "@chakra-ui/react";
import ActiveProject from "./Projects/ActiveProject";
import ProjectList from "./Projects/ProjectList";

type Props = {};

const Portfolio = (props: Props) => {
  const [activeProject, setActiveProject] = useState<string>("");

  return (
    <>
      <NavBar />
      <HStack marginTop="30px">
        <Flex wrap={"wrap"}>
          <Box>
            <ProjectList
              setActiveProject={setActiveProject}
              activeProject={activeProject}
            />
          </Box>
          <Box>
            <ActiveProject activeProject={activeProject} />
          </Box>
        </Flex>
      </HStack>
    </>
  );
};

export default Portfolio;
