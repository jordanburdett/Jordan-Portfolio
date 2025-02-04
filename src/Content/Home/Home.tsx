import {
  Text,
  Button,
  Box,
  Container,
  Heading,
  Stack,
  useMediaQuery,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import { InfoCardType } from "./Data/CardMockData";
import NavBar from "../../Navigation/NavBar/NavBar";
import { getInfoCards } from "../../Helpers/APIInfoCardHelper";

const Home = () => {
  const navigate = useNavigate();
  const [skillCards, setSkillCards] = useState<InfoCardType[]>([]);
  const [isMobile] = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    getInfoCards().then((result) => {
      if (result) {
        setSkillCards(result);
      }
    });
  }, []);

  const onProjectClick = () => {
    navigate("/portfolio");
  };

  return (
    <>
      <NavBar />
      <Box as="section" bg="bg.surface" minH="100vh">
        <Container 
          py={{ base: "8", md: "16" }} 
          px={{ base: "4", md: "8" }}
          maxW={{ base: "100%", lg: "1200px" }}
        >
          <VStack spacing={{ base: "8", md: "12" }} width="100%">
            {/* Header Section */}
            <Stack spacing={{ base: "4", md: "5" }} align="center" width="100%">
              <Heading 
                size={{ base: "lg", md: "xl" }}
                textAlign="center"
              >
                Jordan Burdett
              </Heading>
              <Text
                color="fg.muted"
                maxW="2xl"
                textAlign="center"
                fontSize={{ base: "md", md: "lg" }}
              >
                Full Stack Software Engineer
              </Text>
              <Button
                size="lg"
                px="8"
                py="4"
                onClick={onProjectClick}
                colorScheme="blue"
                width={{ base: "full", md: "auto" }}
              >
                See my latest projects
              </Button>
            </Stack>

            {/* Cards Section */}
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: skillCards.length }}
              spacing={{ base: "4", md: "6", lg: "8" }}
              width="100%"
            >
              {skillCards.map((card) => (
                <InfoCard
                  key={card.id}
                  header={card.Header}
                  bodyItems={card.bodyItems}
                  fullWidth={true}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
