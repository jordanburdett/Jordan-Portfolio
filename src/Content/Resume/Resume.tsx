import React, { useState } from "react";
import NavBar from "../../Navigation/NavBar/NavBar";
import { Box } from "@chakra-ui/react";

type Props = {};

const Resume = (props: Props) => {
  const [docLink, setDocLink] = useState(
    "https://docs.google.com/document/d/1bP5KwGuDff9_cRx_lGhiB4b7hmje10bh1bSfRHS9TgM/edit?usp=sharing"
  );
  return (
    <>
      <NavBar />
      <Box>
        <iframe src={docLink} width="100%" height={"1200px"}/>
      </Box>
    </>
  );
};

export default Resume;
