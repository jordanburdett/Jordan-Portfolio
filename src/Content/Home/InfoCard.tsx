
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";

type Props = {
  header: string;
  bodyItems: {
    heading: string;
    text: string;
  }[];
};

const InfoCard = (props: Props) => {
  return (
    <Card margin={"10px"} maxW={"xl"} minW={"sm"} >
      <CardHeader>
        <Heading size="md">{props.header}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {props.bodyItems.map((item, index) => (
            <Box key={index}>
              <Heading size="xs" textTransform="uppercase">
                {item.heading}
              </Heading>
              <Text pt="2" fontSize="sm">
                {item.text}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
