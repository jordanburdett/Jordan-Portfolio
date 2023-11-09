import { Project } from "../../Portfolio/Projects/Data/project";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

type Props = {
  setProjects: (projects: Project[]) => void;
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
  projects: Project[];
};

const EditingProject = (props: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newProject: Project = { ...props.selectedProject, [name]: value };
    props.setSelectedProject(newProject);
  };

  const handlTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newProject: Project = { ...props.selectedProject, [name]: value };
    props.setSelectedProject(newProject);
  };

  const handleSave = async () => {
    props.setSelectedProject(props.selectedProject);
    const newProjects = [...props.projects];

    // find the selected project and update it
    const index = newProjects.findIndex(
      (project) => project.id === props.selectedProject.id
    );

    // this must be a new project if it can't be found
    if (index === -1) {
      newProjects.push(props.selectedProject);
    } else {
      newProjects[index] = props.selectedProject;
    }

    props.setProjects(newProjects);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="title">Title:</FormLabel>
        <Input
          type="text"
          id="title"
          name="title"
          value={props.selectedProject.title}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="summary">Summary:</FormLabel>
        <Textarea
          id="summary"
          name="summary"
          value={props.selectedProject.summary}
          onChange={handlTextAreaChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="image">Image:</FormLabel>
        <Input
          type="text"
          id="image"
          name="image"
          value={props.selectedProject.href}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button onClick={handleSave} marginTop={"20px"}>
        Save
      </Button>
    </Box>
  );
};

export default EditingProject;
