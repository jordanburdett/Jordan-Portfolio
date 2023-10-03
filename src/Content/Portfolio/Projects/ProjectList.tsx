import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Button,
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
  useColorMode,
  useMediaQuery,
  Collapse,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  setActiveProject: (projectName: string) => void;
  activeProject: string;
};

const projectsMock = [
  {
    Name: "Project 1",
    Link: "https://www.google.com",
    Type: "WebApp",
    Technologies: ["Angular"],
    Content: [
      {
        image: "https://via.placeholder.com/150",
        text: "This is a description",
      },
      {
        image: "https://via.placeholder.com/150",
        text: "This is a description",
      },
      {
        image: "https://via.placeholder.com/150",
        text: "This is a description",
      },
      {
        image: "https://via.placeholder.com/150",
        text: "This is a description",
      },
    ],
  },
  {
    Name: "Project 2",
    Link: "https://www.google.com",
    Type: "WebApp",
    Technologies: ["React", "Node"],
  },
  {
    Name: "Project 3",
    Link: "https://www.google.com",
    Type: "WebApp",
    Technologies: ["React"],
  },
];

const ProjectList = (props: Props) => {
  const [projects, setProjects] = useState(projectsMock);
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 687px)");
  const [isTableShowing, setIsTableShowing] = useState(true);

  const onArrowClick = () => {
    setIsTableShowing((prev) => !prev);
  };

  return (
    <TableContainer
      textAlign={"center"}
      margin={"30px"}
      marginTop={"0"}
      minWidth={"320px"}
    >
      {isMobile && !isTableShowing && (
        <ArrowDownIcon
          fontSize={"3xl"}
          style={{ borderRadius: "20px", padding: "5px" }}
          _hover={{ backgroundColor: "gray" }}
          onClick={onArrowClick}
        />
      )}
      {isMobile && isTableShowing && (
        <ArrowUpIcon
          style={{ borderRadius: "20px", padding: "5px" }}
          fontSize={"3xl"}
          _hover={{ backgroundColor: "gray" }}
          onClick={onArrowClick}
        />
      )}
      <Collapse
        in={isTableShowing}
        animateOpacity
        style={{ flexWrap: "wrap", width: "100%" }}
      >
        <Table variant="simple" size={["sm", "md", "lg"]}>
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

                  if (isMobile) {
                    onArrowClick();
                  }
                }}
                _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
                bg={
                  project.Name === props.activeProject ? "gray.700" : "default"
                }
                key={project.Name}
              >
                <Td>
                  <Text>{project.Name}</Text>
                </Td>
                <Td>
                  <Text>{project.Type}</Text>
                </Td>
                <Td>
                  <Text>{project?.Technologies[0]}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </TableContainer>
  );
};

export default ProjectList;
