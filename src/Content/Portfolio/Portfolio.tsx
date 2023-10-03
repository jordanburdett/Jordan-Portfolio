import { useState } from "react";
import NavBar from "../../Navigation/NavBar/NavBar";
import { Box, Flex, HStack, useMediaQuery } from "@chakra-ui/react";
import ActiveProject from "./Projects/ActiveProject";
import ProjectList from "./Projects/ProjectList";
import { Project } from "./Projects/Data/project";

// mock data for Project type
const mockProject: Project = {
  title: "",
  href: "",
  summary: "",
  type: "",
  technologies: [""],
  isHidden: true,
  content: [],
};

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<Project>(mockProject);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <NavBar />
      <HStack marginTop="30px" flexDirection={"column"}>
        <Flex wrap={isMobile ? "wrap" : "nowrap"} justifyContent={"center"}>
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
