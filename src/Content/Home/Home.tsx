import {
  Text,
  Button,
  HStack,
  Box,
  Container,
  Heading,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import {
  InfoCardType
} from "./Data/CardMockData";
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
        console.log(result);
      }
    });
  }, [])
  

  const onProjectClick = () => {
    // using react router dom to navigate to the portfolio page
    navigate("/portfolio");
  };



  return (
    <>
      <NavBar />
      <Box as="section" bg="bg.surface">
        <Container py={{ base: "16", md: "24" }}>
          <Stack spacing={{ base: "8", md: "10" }}>
            <Stack spacing={{ base: "4", md: "5" }} align="center">
              <Heading size={{ base: "md", lg: "lg", xl: "xl" }}>
                Jordan Burdett
              </Heading>
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
              <Button
                size="xl"
                style={{ padding: "10px" }}
                onClick={onProjectClick}
              >
                See my latest projects here
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <HStack
        justifyContent={"space-evenly"}
        wrap={isMobile ? "wrap" : "nowrap"}
        marginRight={"40px"}
        marginLeft={"40px"}
        alignItems={"stretch"}
      >
        {skillCards.map((card) => (
          <InfoCard
            key={card.id}
            header={card.Header}
            bodyItems={card.bodyItems}
            fullWidth={isMobile ? true : false}
          />
        ))}
      </HStack>
    </>
  );
};

export default Home;
