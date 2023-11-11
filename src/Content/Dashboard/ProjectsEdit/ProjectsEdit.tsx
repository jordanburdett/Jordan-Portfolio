import { Text, Button, Center, Flex, VStack } from "@chakra-ui/react";
import NavBar from "../../../Navigation/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import ProjectsList from "./ProjectsList";
import { useEffect, useState } from "react";
import { Project } from "../../Portfolio/Projects/Data/project";
import EditingProject from "./EditingProject";
import { getProjects } from "../../../Helpers/APIProjectHelper";

const emptyProject: Project = {
  id: 0,
  title: "",
  href: "",
  summary: "",
  content: [],
  technologies: [],
  isHidden: false,
  type: ""
};


const ProjectsEdit = () => {
  const navigate = useNavigate();
  const onBacktoDashboardClick = () => {
    navigate("/dashboard");
  };

  const [projects, setProjects] = useState<Project[]>([emptyProject]);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  useEffect(() => {
    getProjects().then((result) => {
      setProjects(result);
      setSelectedProject(result[0]);
    })
  }, [])

  const onNewProjectClick = () => {
    const newProject: Project = {
      id: projects.length + 1,
      title: "",
      href: "",
      summary: "",
      content: [],
      technologies: [],
      isHidden: false,
      type: ""
    };

    setSelectedProject(newProject);
  }
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
            <Button onClick={onNewProjectClick}>Add New Project</Button>
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