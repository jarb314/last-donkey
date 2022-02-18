const { response } = require("express");
const fetch = require("node-fetch");
const axios = require("axios").default;
require("dotenv").config();

// const headers = {
//   Authorization: process.env.AUTHORIZATION
// };

axios.defaults.headers.common["Authorization"] = process.env.AUTHORIZATION;

exports.createMember = async (member) => {
  return axios
    .post("https://api.alegra.com/api/v1/contacts", {
      name: `${member["name"]} ${member["code"]}`,
      address: {
        address: member["address"]
      },
      email: member["email"],
      phonePrimary: member["phone"],
      type: ["client"]
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

exports.getMembers = async () => {
  return axios
    .get("https://api.alegra.com/api/v1/contacts/?name=CN-")
    .then(function (response) {
      data = response["data"]
        .map((item) => {
          return {
            id: item["id"],
            code: item["name"].match(/CN-[0-9]+/)[0],
            name: item["name"],
            address: item["address"]["description"],
            phone: item["phonePrimary"],
            email: item["email"]
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
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

exports.getMemberByCode = async (code) => {
  return axios
    .get("https://api.alegra.com/api/v1/contacts/?name=" + code)
    .then(function (response) {
      console.log(response["data"]);
      data = response["data"].map((item) => {
        return {
          id: item["id"],
          code: item["name"].match(/CN-[0-9]+/)[0],
          name: item["name"],
          address: item["address"]["description"],
          phone: item["phonePrimary"],
          email: item["email"]
        };
      });
      // console.log(data[0]);
      return data[0];
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};
