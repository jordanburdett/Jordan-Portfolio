import { InfoCardType } from "../../Home/Data/CardMockData";
import { Box, Center, Divider, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

type Props = {
  infoCards: InfoCardType[];
  setSelectedInfoCard: (infoCard: InfoCardType) => void;
};

const InfoCardList = (props: Props) => {
  const hoverColors = useColorModeValue("gray.100", "gray.900");
  
  const onCreateNewInfoCard = () => {
    const newInfoCard: InfoCardType = {
      id: uuidv4(),
      Header: "Enter header here",
      bodyItems: [{
        heading: "enter subHeading here",
        text: "enter text for subheading here",
      }],
      Hidden: false,
    };
    props.setSelectedInfoCard(newInfoCard);
  };

  return (
    <>
      <Button onClick={onCreateNewInfoCard}>Create New InfoCard</Button>
      <Text fontSize={"4xl"} margin={"10px"}>Info Card List</Text>
      {props.infoCards.map((infoCard, index) => (
        <Box key={infoCard.id}>
          {index !== 0 && <Divider />}
          <Center
            onClick={() => {
              props.setSelectedInfoCard(infoCard);
            }}
            _hover={{ cursor: "pointer", backgroundColor: hoverColors }}
            padding={"20px"}
          >
            <h1>{infoCard.Header}</h1>
          </Center>
        </Box>
      ))}
    </>
  );
};

export default InfoCardList;
