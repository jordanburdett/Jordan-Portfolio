import { useState } from "react";
import { Project } from "../../Portfolio/Projects/Data/project";
import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Text,
  Divider,
} from "@chakra-ui/react";
import EditingProjectContent from "./EditingProjectContent";
import { addNewProject, updateProject } from "../../../Helpers/APIProjectHelper";

type Props = {
  setProjects: (projects: Project[]) => void;
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
  projects: Project[];
};

const EditingProject = (props: Props) => {
  const [newTechnology, setNewTechnology] = useState("");

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
      const result = await addNewProject(props.selectedProject);

      if (!result?.success) {
        console.log(result?.message);
      }

    } else {
      newProjects[index] = props.selectedProject;
      const result = await updateProject(props.selectedProject);
      
      if (!result?.success) {
        console.log(result?.message);
      }
    }

    props.setProjects(newProjects);
  };

  const handleNewTechnologiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNewTechnology(value);
  };

  const onNewTechClick = () => {
    if (!newTechnology) {
      return;
    }
    const newProject: Project = {
      ...props.selectedProject,
      technologies: [...props.selectedProject.technologies, newTechnology],
    };
    props.setSelectedProject(newProject);
    setNewTechnology("");
  };

  const onRemoveTechClick = (technology: string) => {
    const newProject: Project = {
      ...props.selectedProject,
      technologies: props.selectedProject.technologies.filter(
        (tech) => tech !== technology
      ),
    };
    props.setSelectedProject(newProject);
  };

  const onAddNewBodyItemClick = () => {
    const newProject: Project = {
      ...props.selectedProject,
      content: [
        ...props.selectedProject.content,
        {
          id: props.selectedProject.content.length + 1,
          text: "",
          image: "",
          imageAlt: "",
        },
      ],
    };
    props.setSelectedProject(newProject);
  };



  return (
    <Box>
      <FormControl margin={"20px"}>
        <FormLabel htmlFor="title">Title:</FormLabel>
        <Input
          type="text"
          id="title"
          name="title"
          value={props.selectedProject.title}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl margin={"20px"}>
        <FormLabel htmlFor="summary">Summary:</FormLabel>
        <Textarea
          id="summary"
          name="summary"
          value={props.selectedProject.summary}
          onChange={handlTextAreaChange}
        />
      </FormControl>
      <FormControl margin={"20px"}>
        <FormLabel htmlFor="url">Url:</FormLabel>
        <Input
          type="text"
          id="url"
          name="href"
          value={props.selectedProject.href}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl margin={"20px"}>
        <FormLabel htmlFor="type">Type:</FormLabel>
        <Input
          type="text"
          id="type"
          name="type"
          value={props.selectedProject.type}
          onChange={handleInputChange}
        />
      </FormControl>
      <Stack
        divider={<Divider />}
        flex={"wrap"}
        margin={"20px"}
        flexDirection={"column"}
      >
        <Text fontSize="3xl">Technologies</Text>
        {props.selectedProject.technologies.map((technology) => (
          <Box
            key={technology}
            display={"flex"}
            flexWrap="nowrap"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text fontSize={"sm"}>{technology}</Text>
            <CloseButton onClick={() => onRemoveTechClick(technology)} />
          </Box>
        ))}
      </Stack>
      <FormControl margin={"20px"}>
        <FormLabel htmlFor="newTechnology">New Technology:</FormLabel>
        <Input
          type="text"
          id="newTechnology"
          name="newTechnology"
          value={newTechnology}
          onChange={handleNewTechnologiesChange}
        />
        <Button marginTop={"20px"} onClick={onNewTechClick}>
          Add Tech
        </Button>
      </FormControl>
      <Stack
        divider={<Divider />}
        flex={"wrap"}
        margin={"20px"}
        flexDirection={"column"}
      >
        <Text fontSize="3xl">Body Items</Text>
        {props.selectedProject.content.map((content) => (
          <EditingProjectContent
            key={content.id}
            content={content}
            selectedProject={props.selectedProject}
            setSelectedProject={props.setSelectedProject}
          />
        ))}
        <Button onClick={onAddNewBodyItemClick}>Add new Body Item</Button>
      </Stack>
      <FormControl margin={"20px"}></FormControl>

      <Button onClick={handleSave} margin={"20px"}>
        Save
      </Button>
    </Box>
  );
};

export default EditingProject;
