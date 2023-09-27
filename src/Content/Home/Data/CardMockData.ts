export const FrontEndSkillCardData = {
  Header: "Front End Skills",
  bodyItems: [
    { heading: "Languages", text: "Javascript, Typescript" },
    { heading: "Frameworks", text: "React, Angular" },
    { heading: "Libraries", text: "Chakra UI, Material UI, Bootstrap, Styled Components" },
  ],
};

export const BackEndSkillCardData = {
  Header: "Back End Skills",
  bodyItems: [
    { heading: "Nodejs", text: "3 years" },
    { heading: ".net", text: "3 years" },
    { heading: "Databases", text: "MongoDB, CosmosDB, SQL, Postgres" },
  ],
};

export const EducationSkillCardData = {
  Header: "Education",
  bodyItems: [
    { heading: "Brigham Young University - Idaho", text: "2018 - 2021" },
    { heading: "B.S. Software Engineering", text: "GPA: 3.95" },
    { heading: "Teachers Assistant", text: "CS-165 Data Structures" },
  ],
};

export const SkillCardCollectionData = [FrontEndSkillCardData, BackEndSkillCardData, EducationSkillCardData];

export type skillCardCollection = {
  Header: string;
  bodyItems: { heading: string; text: string }[];
}[];
