import React, { useState } from "react";
import { Project, ProjectContent } from "../../Portfolio/Projects/Data/project";
import { Input, CloseButton, Box, Text, Image, Button } from "@chakra-ui/react";

type Props = {
  content: ProjectContent;
  selectedProject: Project;
  setSelectedProject: (project: Project) => void;
};

const EditingProjectContent = (props: Props) => {
  const content = props.content;
  const [newContentText, setNewContentText] = useState("");
  const [newContentImageItem, setNewContentImageItem] = useState("");
  const [newContentImageAltText, setNewContentImageAltText] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditingAltImageText, setIsEditingAltImageText] = useState(false);

  const onRemoveBodyItemClick = (id: number) => {
    const newProject: Project = {
      ...props.selectedProject,
      content: props.selectedProject.content.filter((item) => item.id !== id),
    };
    props.setSelectedProject(newProject);
  };

  const onNewContentImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNewContentImageItem(value);
  };

  const onNewContentImageAltTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNewContentImageAltText(value);
  };

  const onAddImageURL = () => {
    const newContent: ProjectContent[] = [...props.selectedProject.content];
    const index = newContent.findIndex((item) => item.id === content.id);
    newContent[index] = {
      ...content,
      image: newContentImageItem,
    };

    const newProject: Project = {
      ...props.selectedProject,
      content: newContent,
    };

    props.setSelectedProject(newProject);
  };

  const onAddImageAltText = () => {
    const newContent: ProjectContent[] = [...props.selectedProject.content];
    const index = newContent.findIndex((item) => item.id === content.id);
    newContent[index] = {
      ...content,
      imageAlt: newContentImageAltText,
    };

    const newProject: Project = {
      ...props.selectedProject,
      content: newContent,
    };

    props.setSelectedProject(newProject);
  };

    const onNewContentTextChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setNewContentText(value);
    };

    const onNewContentButtonClick = () => {
        const newContent: ProjectContent[] = [...props.selectedProject.content];
        const index = newContent.findIndex((item) => item.id === content.id);
        newContent[index] = {
            ...content,
            text: newContentText,
        };

        const newProject: Project = {
            ...props.selectedProject,
            content: newContent,
        };

        props.setSelectedProject(newProject);
    };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexWrap={"nowrap"}
      flexDirection={"row"}
      alignItems={"center"}
    >
      <Box
        key={content.id}
        display={"flex"}
        flexWrap="wrap"
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        flexDirection={"column"}
      >
        {content?.text && <Text fontSize={"sm"}>{content.text}</Text>}
        {!content?.text && <>
            <Input
              type="text"
              value={newContentText}
              onChange={onNewContentTextChange}
              placeholder="New Text For body Content"
              marginTop={"20px"}
            />
            <Button marginTop={"20px"} onClick={onNewContentButtonClick}>
              Add Text
            </Button>
        </>}

        {content?.image && (
          <Image src={content?.image} width={"400px"} marginTop={"20px"} />
        )}
        {!content?.image && (
          <>
            <Input
              type="text"
              id="newContent"
              name="newContent"
              value={newContentImageItem}
              onChange={onNewContentImageChange}
              placeholder="Image URL"
              marginTop={"20px"}
            />
            <Button marginTop={"20px"} onClick={onAddImageURL}>
              Add Image URL
            </Button>
          </>
        )}
        {content?.imageAlt && <Text>Alt Text: {content.imageAlt}</Text>}
        {!content?.imageAlt && (
          <>
            <Text color={"red"} marginTop={"20px"}>
              add Alt Text to Image
            </Text>
            <Input
              type="text"
              value={newContentImageAltText}
              onChange={onNewContentImageAltTextChange}
              marginTop={"20px"}
            />
            <Button marginTop={"20px"} onClick={onAddImageAltText}>
              Add Image URL Alt Text
            </Button>
          </>
        )}
      </Box>
      <Box>
        <CloseButton onClick={() => onRemoveBodyItemClick(content.id)} />
      </Box>
    </Box>
  );
};

export default EditingProjectContent;
