export const FrontEndSkillCardData = {
  id: "1",
  Header: "Front End Skills",
  Hidden: false,
  bodyItems: [
    { heading: "Languages", text: "Javascript, Typescript" },
    { heading: "Frameworks", text: "React, Angular" },
    { heading: "Libraries", text: "Chakra UI, Material UI, Bootstrap, Styled Components" },
  ],
};

export const BackEndSkillCardData = {
  id: "2",
  Header: "Back End Skills",
  Hidden: false,
  bodyItems: [
    { heading: "Nodejs", text: "3 years" },
    { heading: ".net", text: "3 years" },
    { heading: "Databases", text: "MongoDB, CosmosDB, SQL, Postgres" },
  ],
};

export const EducationSkillCardData = {
  id: "3",
  Header: "Education",
  Hidden: false,
  bodyItems: [
    { heading: "Brigham Young University - Idaho", text: "2018 - 2021" },
    { heading: "B.S. Software Engineering", text: "GPA: 3.95" },
    { heading: "Teachers Assistant", text: "CS-165 Data Structures" },
  ],
};

export const EmptyInfoCardData = {
  id: "",
  Header: "",
  Hidden: false,
  bodyItems: [],
};

export const SkillCardCollectionData = [FrontEndSkillCardData, BackEndSkillCardData, EducationSkillCardData];

export type skillCardCollection = {
  id: string;
  Header: string;
  Hidden: boolean;
  bodyItems: { heading: string; text: string }[];
}[];

export type InfoCardType = {
  id: string;
  Header: string;
  Hidden: boolean;
  bodyItems: { heading: string; text: string }[];
};
