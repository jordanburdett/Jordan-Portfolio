import { ChangeEvent, useState } from "react";
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
  Textarea,
  Checkbox,
  HStack,
  useToast,
  Container,
} from "@chakra-ui/react";
import {
  addNewInfoCard,
  updateInfoCard,
  deleteInfoCard,
} from "../../../Helpers/APIInfoCardHelper";

type Props = {
  isEditing: boolean;
  selectedInfoCard: InfoCardType;
  setInfoCards: (infoCards: InfoCardType[]) => void;
  infoCards: InfoCardType[];
  setSelectedInfoCard: (infoCard: InfoCardType) => void;
};

const EditInfoCard = (props: Props) => {
  const [isSaveButtonActive, setisSaveButtonActive] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

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

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    field: string,
    subHeadingIndex?: number
  ) => {
    if (isSaveButtonActive === false) {
      setisSaveButtonActive(true);
    }

    const newInfoCard: InfoCardType = {
      ...props.selectedInfoCard,
    };

    switch (field) {
      case "InfoCardHeader":
        newInfoCard.Header = event.target.value;
        break;
      case "InfoCardSubHeading":
        if (subHeadingIndex != null) {
          newInfoCard.bodyItems[subHeadingIndex].heading = event.target.value;
        }
        break;
      case "InfoCardText":
        if (subHeadingIndex != null) {
          newInfoCard.bodyItems[subHeadingIndex].text = event.target.value;
        }
        break;
      default:
        console.error("no field provided");
        return;
    }
    props.setSelectedInfoCard(newInfoCard);
  };

  const handleHiddenChange = () => {
    const newInfoCard: InfoCardType = {
      ...props.selectedInfoCard,
    };

    newInfoCard.Hidden = !newInfoCard.Hidden;
    props.setSelectedInfoCard(newInfoCard);
    if (isSaveButtonActive === false) {
      setisSaveButtonActive(true);
    }
  };

  const saveInfoCard = async () => {
    let isNewInfoCard = false;
    const newInfoCards = [...props.infoCards];
    const index = newInfoCards.findIndex(
      (infoCard) => infoCard.id === props.selectedInfoCard.id
    );

    if (index === -1) {
      console.log("We can't find index this must be a new");
      newInfoCards.push(props.selectedInfoCard);
      isNewInfoCard = true;
    } else {
      newInfoCards[index] = props.selectedInfoCard;
    }

    props.setInfoCards(newInfoCards);

    // set some kind of spinning button TODO
    if (isNewInfoCard) {
      const result = await addNewInfoCard(props.selectedInfoCard);
      console.log(result);
    } else {
      const result = await updateInfoCard(props.selectedInfoCard);
      console.log(result);
    }

    // reset spinning button display error if error TODO

    setisSaveButtonActive(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteInfoCard(props.selectedInfoCard.id);
      
      if (result.success) {
        const newInfoCards = props.infoCards.filter(
          (card) => card.id !== props.selectedInfoCard.id
        );
        props.setInfoCards(newInfoCards);
        toast({
          title: "Info Card Deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete info card",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {props.isEditing ? (
        <>
          <Card margin={"10px"} maxW={"xl"} minW={"sm"}>
            <CardHeader>
              <Heading size="md">
                <Textarea
                  value={props.selectedInfoCard.Header}
                  onChange={(event) =>
                    handleInputChange(event, "InfoCardHeader")
                  }
                />
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {props.selectedInfoCard.bodyItems.map((item, index) => (
                  <Box key={index}>
                    <Heading size="xs" textTransform="uppercase">
                      <Textarea
                        value={item.heading}
                        onChange={(event) =>
                          handleInputChange(event, "InfoCardSubHeading", index)
                        }
                      />
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      <Textarea
                        value={item.text}
                        onChange={(event) =>
                          handleInputChange(event, "InfoCardText", index)
                        }
                      />
                    </Text>
                  </Box>
                ))}
                <Button onClick={addNewBodyItem}>Add New Body Item</Button>
              </Stack>
            </CardBody>
          </Card>
        </>
      ) : (
        <Container maxW="md" p={4} minW="320px">
          <Box maxW="sm" minW="300px" mx="auto">
            <InfoCard
              header={props.selectedInfoCard?.Header}
              bodyItems={props.selectedInfoCard?.bodyItems}
              fullWidth={true}
            />
          </Box>
        </Container>
      )}
      <HStack spacing={4} mt={4}>
        <Checkbox
          isChecked={props.selectedInfoCard.Hidden}
          onChange={handleHiddenChange}
        >
          isHidden
        </Checkbox>
        {isSaveButtonActive && <Button onClick={saveInfoCard}>Save</Button>}
        <Button
          colorScheme="red"
          onClick={handleDelete}
          isLoading={isDeleting}
          loadingText="Deleting"
        >
          Delete
        </Button>
      </HStack>
    </>
  );
};

export default EditInfoCard;
