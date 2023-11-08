import { InfoCardType } from "../../Home/Data/CardMockData";
import InfoCard from "../../Home/InfoCard";
import {
  Card,
  CardHeader,
  Button,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";

type Props = {
  isEditing: boolean;
  selectedInfoCard: InfoCardType;
  setInfoCards: (infoCards: InfoCardType[]) => void;
  setSelectedInfoCard: (infoCard: InfoCardType) => void;
};

const EditInfoCard = (props: Props) => {
  const addNewBodyItem = () => {
    const newBodyItem = {
      heading: "enter subHeading here",
      text: "enter text for subheading here",
    };
    const newInfoCard = {
      ...props.selectedInfoCard,
      bodyItems: [...props.selectedInfoCard.bodyItems, newBodyItem],
    };
    props.setSelectedInfoCard(newInfoCard);
  };

  return (
    <>
      {props.isEditing ? (
        <>
          <Card margin={"10px"} maxW={"xl"} minW={"sm"}>
            <CardHeader>
              <Heading size="md">{props.selectedInfoCard.Header}</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {props.selectedInfoCard.bodyItems.map((item, index) => (
                  <Box key={index}>
                    <Heading size="xs" textTransform="uppercase">
                      {item.heading}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {item.text}
                    </Text>
                  </Box>
                ))}
                <Button onClick={addNewBodyItem}>Add New Body Item</Button>
              </Stack>
            </CardBody>
          </Card>
        </>
      ) : (
        <InfoCard
          header={props.selectedInfoCard?.Header}
          bodyItems={props.selectedInfoCard?.bodyItems}
        />
      )}
    </>
  );
};

export default EditInfoCard;
