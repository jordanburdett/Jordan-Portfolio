import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useMediaQuery,
  Collapse,
} from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "./Data/project";

type Props = {
  setActiveProject: (project: Project) => void;
  activeProject: Project;
};

const projectsMock = [
  {
    title: "Score Games",
    href: "https://www.scoregames.net",
    summary: "Card scoring game works in realtime with instant score updates",
    type: "WebApp",
    technologies: ["React", "Firebase", "Javascript"],
    isHidden: false,
    content: [
      {
        image: "https://fakeimg.pl/1600x900",
        text: "Score Games is a card scoring game built with React and Firebase.",
      },
      {
        text: "The application allows the user to sign in and store their games via google authentication.",
      },
      {
        image: "https://fakeimg.pl/1600x900",
        text: "This is a ",
      },
      {
        image: "https://fakeimg.pl/1600x900",
        text: "This is a description",
      },
    ],
  },
  {
    title: "Lake powell calendar",
    href: "https://www.scoregames.net",
    summary: "Card scoring game works in realtime with instant score updates",
    type: "WebApp",
    technologies: ["React", "Firebase", "Javascript"],
    isHidden: false,
    content: [
      {
        image: "https://fakeimg.pl/1600x900",
        text: "Score Games is a card scoring game built with React and Firebase.",
      },
      {
        text: "The application allows the user to sign in and store their games via google authentication.",
      },
      {
        image: "https://fakeimg.pl/1600x900",
        text: "This is a ",
      },
      {
        image: "https://fakeimg.pl/1600x900",
        text: "This is a description",
      },
    ],
  },
  {
    title: "Soday Crazy",
    href: "https://www.scoregames.net",
    summary: "Card scoring game works in realtime with instant score updates",
    type: "WebApp",
    technologies: ["React", "Firebase", "Javascript"],
    isHidden: false,
    content: [
      {
        image: "https://fakeimg.pl/1600x900",
        text: "Score Games is a card scoring game built with React and Firebase.",
      },
      {
        text: "The application allows the user to sign in and store their games via google authentication.",
      },
      {
        image: "https://fakeimg.pl/1600x900",
        text: "This is a ",
      },
      {
        image: "https://fakeimg.pl/1600x900",
        text: "This is a description",
      },
    ],
  },
];

const ProjectList = (props: Props) => {
  const [projects] = useState(projectsMock);
  const { colorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
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
                  props.setActiveProject(project);

                  if (isMobile) {
                    onArrowClick();
                  }
                }}
                _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
                bg={project === props.activeProject ? "gray.700" : "default"}
                key={project.title}
              >
                <Td>
                  <Text>{project.title}</Text>
                </Td>
                <Td>
                  <Text>{project.type}</Text>
                </Td>
                <Td>
                  <Text>{project?.technologies[0]}</Text>
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
