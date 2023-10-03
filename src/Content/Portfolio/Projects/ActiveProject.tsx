import React from "react";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";

type Props = {
  activeProject: string;
};

const ActiveProject = (props: Props) => {
  return (
    <Box margin={"30px"} marginTop={"0"}>
      <Heading>{props.activeProject}</Heading>
      <Divider margin={"20px 0"}/>
      <Text>Project descriptions and stuff</Text>
    </Box>
  );
};

export default ActiveProject;
