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
} from "@chakra-ui/react";
import { AboutType, emptyAbout } from "../../About/Data/about";
import { getAbout, updateAbout } from "../../../Helpers/APIAboutHelper";
import { BiBold, BiItalic, BiParagraph, BiListUl, BiListOl } from "react-icons/bi";

const AboutEdit = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState<AboutType>(emptyAbout);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getAbout().then((result) => setAbout(result));
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof AboutType
  ) => {
    if (!isSaveButtonActive) {
      setIsSaveButtonActive(true);
    }

    setAbout({
      ...about,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateAbout(about);
      setIsSaveButtonActive(false);
    } catch (error) {
      console.error("Error saving about:", error);
    }
  };

  const onBackToDashboardClick = () => {
    navigate("/dashboard");
  };

  const insertTag = (openTag: string, closeTag: string) => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const text = about.text;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + openTag + selectedText + closeTag + text.substring(end);

    setAbout({
      ...about,
      text: newText,
    });
    setIsSaveButtonActive(true);
  };

  const formatButtons = [
    { icon: BiBold, tooltip: "Bold", tags: ["<strong>", "</strong>"] },
    { icon: BiItalic, tooltip: "Italic", tags: ["<em>", "</em>"] },
    { icon: BiParagraph, tooltip: "Paragraph", tags: ["<p>", "</p>"] },
    { icon: BiListUl, tooltip: "Unordered List", tags: ["<ul>\n  <li>", "</li>\n</ul>"] },
    { icon: BiListOl, tooltip: "Ordered List", tags: ["<ol>\n  <li>", "</li>\n</ol>"] },
  ];

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" mb={4}>
        <Button onClick={onBackToDashboardClick}>Back to Dashboard</Button>
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
            {formatButtons.map((button, index) => (
              <Tooltip key={index} label={button.tooltip}>
                <IconButton
                  aria-label={button.tooltip}
                  icon={<button.icon />}
                  onClick={() => insertTag(button.tags[0], button.tags[1])}
                />
              </Tooltip>
            ))}
          </HStack>
          <Textarea
            value={about.text}
            onChange={(e) => handleInputChange(e, "text")}
            minHeight="200px"
            ref={(ref) => setTextareaRef(ref)}
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
