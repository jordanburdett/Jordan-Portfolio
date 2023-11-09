import { useEffect, useState } from "react";
import { Box, Text, Button, VStack, Flex, Center } from "@chakra-ui/react";
import { EmptyInfoCardData, InfoCardType } from "../../Home/Data/CardMockData";
import InfoCardList from "./InfoCardList";
import EditInfoCard from "./EditInfoCard";
import NavBar from "../../../Navigation/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { getAllInfoCards } from "../../../Helpers/APIInfoCardHelper";

const InfoCardEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [InfoCards, setInfoCards] = useState<InfoCardType[]>([]);
  const [selectedInfoCard, setSelectedInfoCard] =
    useState<InfoCardType>(EmptyInfoCardData);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      console.log("user effect ran in dashboard");
      navigate("/login");
    }
  });

  useEffect(() => {
    getAllInfoCards().then((infoCards) => setInfoCards(infoCards));
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onBacktoDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <NavBar />
      <Button onClick={onBacktoDashboardClick} margin={"20px"}>Back To Dashboard</Button>
      <Center>
        <Flex>
          <Box margin={"30px"} marginTop={"50px"}>
            <InfoCardList
              infoCards={InfoCards}
              setSelectedInfoCard={setSelectedInfoCard}
            />
          </Box>
          <VStack spacing={3} margin={"30px"} marginTop={"50px"}>
            <Button onClick={toggleEditing}>
              {isEditing ? "Preview Mode" : "Edit Mode"}
            </Button>
            <Text fontSize={"4xl"}>
              {isEditing ? "Edit Mode" : "Preview Mode"}
            </Text>
            <EditInfoCard
              isEditing={isEditing}
              selectedInfoCard={selectedInfoCard}
              setInfoCards={setInfoCards}
              setSelectedInfoCard={setSelectedInfoCard}
              infoCards={InfoCards}
            />
          </VStack>
        </Flex>
      </Center>
    </>
  );
};

export default InfoCardEdit;
