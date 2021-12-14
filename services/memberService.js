const fetch = require("node-fetch");
require("dotenv").config();

const headers = {
  //   Authorization:
  //     "Basic cXVlc29qYS5uYXR1cmVAZ21haWwuY29tOjU5ZTMwOTdhZmU0OTYyNWUyOWYx",
  Authorization: process.env.AUTHORIZATION,
};

exports.getMembers = async () => {
  return await fetch("https://api.alegra.com/api/v1/contacts/?name=CN-", {
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      data = json
        .map((item) => {
          return {
            id: item["id"],
            code: item["name"].match(/CN-[0-9]+/)[0],
            name: item["name"],
            address: item["address"]["description"],
            phone: item["phonePrimary"],
            email: item["email"],
          };
        })
        .sort((a, b) => {
          var codeA = a.code.toUpperCase(); // ignore upper and lowercase
          var codeB = b.code.toUpperCase(); // ignore upper and lowercase
          if (codeA < codeB) {
            return -1;
          }
          if (codeA > codeB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      return data;
    });
};

exports.getMemberByCode = async (code) => {
  return await fetch("https://api.alegra.com/api/v1/contacts/?name=" + code, {
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      data = json.map((item) => {
        return {
          id: item["id"],
          code: item["name"].match(/CN-[0-9]+/)[0],
          name: item["name"],
          address: item["address"]["description"],
          phone: item["phonePrimary"],
          email: item["email"],
        };
      });
      console.log(data[0]);
      return data[0];
    });
};
