import { Project } from "../../Portfolio/Projects/Data/project";
import { Center } from "@chakra-ui/react";
import { List, ListItem, useColorModeValue } from "@chakra-ui/react";

type Props = {
  projects: Project[];
  setSelectedProject: (project: Project) => void;
};

const ProjectsList = (props: Props) => {
  const { projects, setSelectedProject } = props;
  const hoverColors = useColorModeValue("gray.100", "gray.900");

  return (
    <List spacing={3}>
      {projects.map((project) => (
        <Center
          key={project.id}
          padding="20px"
          _hover={{ backgroundColor: hoverColors, cursor: "pointer" }}
          onClick={() => {
            console.log("setSelectedProject", project);
            setSelectedProject(project)}}
        >
          <ListItem>
            {project.title}
          </ListItem>
        </Center>
      ))}
    </List>
  );
};

export default ProjectsList;
