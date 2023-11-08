import { useState } from "react";
import { Box, HStack, Text, Button, VStack } from "@chakra-ui/react";
import {
  EmptyInfoCardData,
  InfoCardType,
  SkillCardCollectionData,
} from "../../Home/Data/CardMockData";
import InfoCardList from "./InfoCardList";
import EditInfoCard from "./EditInfoCard";
import NavBar from "../../../Navigation/NavBar/NavBar";

const InfoCardEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [InfoCards, setInfoCards] = useState<InfoCardType[]>(
    SkillCardCollectionData
  );
  const [selectedInfoCard, setSelectedInfoCard] =
    useState<InfoCardType>(EmptyInfoCardData);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <NavBar />
      <HStack>
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
          />
        </VStack>
      </HStack>
    </>
  );
};

export default InfoCardEdit;
