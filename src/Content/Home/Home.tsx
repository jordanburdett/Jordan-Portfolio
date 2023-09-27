import {
  Center,
  Text,
  VStack,
  Button,
  HStack,
  Box,
  Card,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  CardBody,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import InfoCard from "./InfoCard";
import { FrontEndSkillCardData } from "./Data/CardMockData";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  const onProjectClick = () => {
    // using react router dom to navigate to the portfolio page
    navigate("/portfolio");
  };
  return (
    <>
      <Center height={"400px"}>
        <VStack>
          <Text fontSize="3xl">Hi, My name is Jordan</Text>
          <Text fontSize="3xl">Full Stack Software Engineer</Text>
          <Text fontSize="3xl">
            Solving complex problems with elegant solutions.
          </Text>
          <Button onClick={onProjectClick}>
            Click here to view my projects
          </Button>
        </VStack>
      </Center>
      <HStack justifyContent={"space-evenly"} wrap={"wrap"}>
        <InfoCard
          header="Test"
          bodyItems={[
            { heading: "test1", text: "hit it" },
            { heading: "test2", text: "suck it" },
          ]}
        />
        <InfoCard
          header={FrontEndSkillCardData.Header}
          bodyItems={FrontEndSkillCardData.bodyItems}
        />
        <InfoCard
          header={FrontEndSkillCardData.Header}
          bodyItems={FrontEndSkillCardData.bodyItems}
        />
        <InfoCard
          header={FrontEndSkillCardData.Header}
          bodyItems={FrontEndSkillCardData.bodyItems}
        />
        <InfoCard
          header={FrontEndSkillCardData.Header}
          bodyItems={FrontEndSkillCardData.bodyItems}
        />
      </HStack>
    </>
  );
};

export default Home;
