/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('express')();

app.get('/api/infocard/getallinfocards', (req, res) => {
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
})
