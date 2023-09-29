import React from "react";
import { Heading, Text } from "@chakra-ui/react";

type Props = {
    activeProject: string;
};

const ActiveProject = (props: Props) => {
  return (
    <>
        <Heading>{props.activeProject}</Heading>
        <Text>Project descriptions and stuff</Text>
    </>
  );
};

export default ActiveProject;
