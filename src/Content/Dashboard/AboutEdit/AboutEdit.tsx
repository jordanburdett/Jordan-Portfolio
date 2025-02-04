import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Textarea,
  Input,
  VStack,
  HStack,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { BiBold, BiItalic, BiParagraph, BiListUl, BiListOl } from "react-icons/bi";

import { AboutType, emptyAbout } from "../../About/Data/about";
import { getAbout, updateAbout } from "../../../Helpers/APIAboutHelper";

interface FormatButton {
  icon: React.ComponentType;
  tooltip: string;
  tags: [string, string];
}

/**
 * AboutEdit component provides an interface for editing the About section content.
 * It includes rich text formatting capabilities through HTML tags.
 */
const AboutEdit = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [about, setAbout] = useState<AboutType>(emptyAbout);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAboutData = async () => {
      const result = await getAbout();
      setAbout(result);
    };

    fetchAboutData();
  }, []);

  const formatButtons: FormatButton[] = [
    { icon: BiBold, tooltip: "Bold", tags: ["<strong>", "</strong>"] },
    { icon: BiItalic, tooltip: "Italic", tags: ["<em>", "</em>"] },
    { icon: BiParagraph, tooltip: "Paragraph", tags: ["<p>", "</p>"] },
    { icon: BiListUl, tooltip: "Unordered List", tags: ["<ul>\n  <li>", "</li>\n</ul>"] },
    { icon: BiListOl, tooltip: "Ordered List", tags: ["<ol>\n  <li>", "</li>\n</ol>"] },
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof AboutType
  ) => {
    if (!isSaveButtonActive) {
      setIsSaveButtonActive(true);
    }

    setAbout((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateAbout(about);
      setIsSaveButtonActive(false);
      toast({
        title: "Changes saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving changes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error saving about:", error);
    }
  };

  const insertTag = (openTag: string, closeTag: string) => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = about.text;
    const selectedText = text.substring(start, end);
    const newText = 
      text.substring(0, start) + 
      openTag + 
      selectedText + 
      closeTag + 
      text.substring(end);

    setAbout((prev) => ({
      ...prev,
      text: newText,
    }));
    setIsSaveButtonActive(true);
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" mb={4}>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
        <Button
          colorScheme="blue"
          isDisabled={!isSaveButtonActive}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Flex>

      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>About Text</FormLabel>
          <HStack mb={2} spacing={2}>
            {formatButtons.map(({ icon: Icon, tooltip, tags }, index) => (
              <Tooltip key={index} label={tooltip}>
                <IconButton
                  aria-label={tooltip}
                  icon={<Icon />}
                  onClick={() => insertTag(tags[0], tags[1])}
                />
              </Tooltip>
            ))}
          </HStack>
          <Textarea
            value={about.text}
            onChange={(e) => handleInputChange(e, "text")}
            minHeight="200px"
            ref={setTextareaRef}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            value={about.imageUrl}
            onChange={(e) => handleInputChange(e, "imageUrl")}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Image Alt Text</FormLabel>
          <Input
            value={about.imageAlt}
            onChange={(e) => handleInputChange(e, "imageAlt")}
          />
        </FormControl>

        <Box>
          <FormLabel>Image Preview</FormLabel>
          <Image
            src={about.imageUrl || "https://fakeimg.pl/1600x900"}
            alt={about.imageAlt}
            maxWidth="100%"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default AboutEdit;
