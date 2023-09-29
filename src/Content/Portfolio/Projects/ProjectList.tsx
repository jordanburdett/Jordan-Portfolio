import {
  List,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode
} from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
    setActiveProject: (projectName: string) => void;
    activeProject: string;
};

const projectsMock = [
  {
    Name: "Project 1",
    Type: "WebApp",
    Technologies: "Angular",
  },
  {
    Name: "Project 2",
    Type: "WebApp",
    Technologies: "React, Node",
  },
  {
    Name: "Project 3",
    Type: "WebApp",
    Technologies: "React",
  },
];

const ProjectList = (props: Props) => {
  const [projects, setProjects] = useState(projectsMock);
  const { colorMode } = useColorMode();
  
  return (
    <TableContainer>
      <Table variant="simple" size={"lg"}>
        <TableCaption placement="top">Projects</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Technology</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <Tr
              cursor="pointer"
              onClick={() => {
                props.setActiveProject(project.Name);
              }}
              _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
              bg={project.Name === props.activeProject ? "gray.700" : "default"}
              key={project.Name}
            >
              <Td>
                <Text>{project.Name}</Text>
              </Td>
              <Td>
                <Text>{project.Type}</Text>
              </Td>
              <Td>
                <Text>{project.Technologies}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProjectList;
