const fetch = require("node-fetch");
const fs = require("fs");

fetch(`https://api.smack.works/graphql`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    accessToken: "bd1d7b11-5db5-48c7-bb67-9308768b40f2"
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );
    result.data.__schema.types = filteredData;
    fs.writeFile(
      "./src/config/fragments.json",
      JSON.stringify(result.data),
      err => {
        if (err) {
          console.error("Error writing fragmentTypes file", err);
        } else {
          console.log("Fragment types successfully extracted!");
        }
      }
    );
  });
