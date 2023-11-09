import { Text, Button, Center, Flex, VStack } from "@chakra-ui/react";
import NavBar from "../../../Navigation/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import { useState } from "react";
import { Project } from "../../Portfolio/Projects/Data/project";
import { projectsMock } from "../../Portfolio/Projects/ProjectList";
import EditingProject from "./EditingProject";

const ProjectsEdit = () => {
  const navigate = useNavigate();
  const onBacktoDashboardClick = () => {
    navigate("/dashboard");
  };

  const [projects, setProjects] = useState<Project[]>(projectsMock);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <>
      <NavBar />
      <Button onClick={onBacktoDashboardClick} margin={"20px"}>
        Back To Dashboard
      </Button>
      <Center>
        <Flex>
          <VStack spacing={3} margin={"30px"} marginTop={"50px"}>
            <Text fontSize={"4xl"}>Projects</Text>
            <ProjectsList projects={projects} setSelectedProject={setSelectedProject}/>
          </VStack>
          <VStack spacing={3} margin={"30px"} marginTop={"50px"}>
            <Text fontSize={"4xl"}>Projects Edit</Text>
            <EditingProject setProjects={setProjects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} projects={projects} />
          </VStack>
        </Flex>
      </Center>
    </>
  );
};

export default ProjectsEdit;