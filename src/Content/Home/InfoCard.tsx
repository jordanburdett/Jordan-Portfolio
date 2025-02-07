import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

type Props = {
  fullWidth?: boolean;
  header: string;
  bodyItems: {
    heading: string;
    text: string;
  }[];
};

const InfoCard = (props: Props) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const underlineColor = useColorModeValue('gray.400', 'gray.500');
  const headerColor = useColorModeValue('gray.800', 'white');
  const subheadingColor = useColorModeValue('gray.700', 'gray.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.750');
  
  return (
    <Card
      height="100%"
      width="100%"
      minW="300px"
      boxShadow="lg"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      bg={cardBg}
      _hover={{
        transform: 'translateY(-2px)',
        transition: 'transform 0.2s',
        boxShadow: 'xl',
      }}
    >
      <CardHeader
        pb="2"
        px="6"
        pt="5"
      >
        <Box 
          position="relative" 
          pb="2"
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '40px',
            height: '2px',
            backgroundColor: underlineColor,
            borderRadius: 'full'
          }}
        >
          <Heading 
            size="md" 
            letterSpacing="tight"
            fontWeight="bold"
            color={headerColor}
          >
            {props.header}
          </Heading>
        </Box>
      </CardHeader>
      <CardBody px="6" pt="2">
        <VStack spacing={0} align="stretch" divider={
          <Box 
            height="1px" 
            bg={borderColor} 
            my={4}
            width="100%"
          />
        }>
          {props.bodyItems.map((item, index) => (
            <Box key={index} py={4}>
              <Heading 
                size="xs" 
                textTransform="uppercase"
                letterSpacing="wide"
                mb="2"
                color={subheadingColor}
              >
                {item.heading}
              </Heading>
              <Text 
                fontSize="sm" 
                lineHeight="tall"
                color={textColor}
              >
                {item.text}
              </Text>
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
