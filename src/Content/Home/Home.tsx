import {
  Center,
  Text,
  VStack,
  Button,
  HStack,
  Box,
  Container,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import InfoCard from "./InfoCard";
import {
  SkillCardCollectionData,
  skillCardCollection,
} from "./Data/CardMockData";
type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [skillCards, setSkillCards] = useState<skillCardCollection>(
    SkillCardCollectionData
  );

  const onProjectClick = () => {
    // using react router dom to navigate to the portfolio page
    navigate("/portfolio");
  };
  return (
    <>
      <Box as="section" bg="bg.surface">
        <Container py={{ base: "16", md: "24" }}>
          <Stack spacing={{ base: "8", md: "10" }}>
            <Stack spacing={{ base: "4", md: "5" }} align="center">
              <Heading size={{ base: "md", lg: "lg", xl: "xl" }}>Jordan Burdett</Heading>
              <Text
                color="fg.muted"
                maxW="2xl"
                textAlign="center"
                fontSize={{ base: "sm", lg: "md", xl: "lg" }}
              >
                Full Stack Software Engineer
              </Text>
            </Stack>
            <Stack
              spacing="3"
              direction={{ base: "column", sm: "row" }}
              justify="center"
            >
              <Button variant="secondary" size="xl" onClick={onProjectClick}>
                See my latest projects here
              </Button>
              <Button size="xl" onClick={onProjectClick}>Portfolio</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <HStack
        justifyContent={"space-evenly"}
        wrap={"wrap"}
        marginRight={"40px"}
        marginLeft={"40px"}
      >
        {skillCards.map((card) => (
          <InfoCard
            key={card.Header}
            header={card.Header}
            bodyItems={card.bodyItems}
          />
        ))}
      </HStack>
    </>
  );
};

export default Home;
