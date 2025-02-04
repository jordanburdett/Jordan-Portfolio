import NavBar from "../../Navigation/NavBar/NavBar";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AboutType, emptyAbout } from "./Data/about";
import { getAbout } from "../../Helpers/APIAboutHelper";

const About = () => {
  const [about, setAbout] = useState<AboutType>(emptyAbout);

  useEffect(() => {
    getAbout().then((result) => setAbout(result));
  }, []);

  return (
    <>
      <NavBar />
      <Flex flexWrap={"wrap"} margin={"20px"} justifyContent={"center"}>
        <Box maxWidth="800px" minWidth="300px">
          <Image 
            src={about.imageUrl || "https://fakeimg.pl/1600x900"} 
            alt={about.imageAlt || "me"} 
            marginBottom={"30px"}
          />
        </Box>
        <Box margin={"0 30px"}>
          <Box 
            maxWidth={"600px"}
            dangerouslySetInnerHTML={{ __html: about.text }}
            sx={{
              'p': {
                marginBottom: '1rem'
              },
              'ul, ol': {
                marginLeft: '2rem',
                marginBottom: '1rem'
              },
              'h1, h2, h3, h4, h5, h6': {
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }
            }}
          />
        </Box>
      </Flex>
    </>
  );
};

export default About;
