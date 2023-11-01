export default function handler(req, res) {
  res.json({
    id: "1",
    Header: "Front End Skills",
    Hidden: false,
    bodyItems: [
      { heading: "Languages", text: "Javascript, Typescript" },
      { heading: "Frameworks", text: "React, Angular" },
      {
        heading: "Libraries",
        text: "Chakra UI, Material UI, Bootstrap, Styled Components",
      },
    ],
  });
}
