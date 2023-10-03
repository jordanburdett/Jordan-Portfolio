import React from "react";
import { Box, Divider, Heading, Text, Image, Collapse } from "@chakra-ui/react";
import { Project } from "./Data/project";

type Props = {
  activeProject: Project;
};

const ActiveProject = (props: Props) => {
  if (props.activeProject === null) {
    console.log("active project is null")
  }
  return (
    <Box margin={"30px"} marginTop={"0"}>
      <Heading>{props.activeProject.title}</Heading>
      <Divider margin={"20px 0"} />
      {props.activeProject.content.map((content) => {
        return (
          <Collapse
            in={props.activeProject !== null}
            animateOpacity
            style={{ flexWrap: "wrap", width: "100%" }}
            key={content.text}
          >
            <Box maxWidth={"1000px"}>
              <Text margin={"20px 0"}>{content.text}</Text>
              <Image
                src={content.image}
                alt={content?.imageAlt}
                objectFit={"cover"}
              />
              <Divider margin={"20px 0"} />
            </Box>
          </Collapse>
        );
      })}
    </Box>
  );
};

export default ActiveProject;
