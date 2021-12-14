const fetch = require("node-fetch");
const memberService = require("../services/memberService");
require("dotenv").config();

const headers = {
  // Authorization:
  //   "Basic cXVlc29qYS5uYXR1cmVAZ21haWwuY29tOjU5ZTMwOTdhZmU0OTYyNWUyOWYx",
  Authorization: process.env.AUTHORIZATION,
};

exports.getPurchases = async () => {
  return await memberService
    .getMembers()
    .then((data) => data.map((member) => member.id))
    .then(async (members) => {
      var purchases = [];
      await Promise.all(
        members.map(async (m) => {
          await this.getMemeberPurchases(m).then((data) => {
            purchases.push(...data);
          });
        })
      );
      return purchases.sort((a, b) => new Date(a.date) - new Date(b.date));
    })
    .then((data) => {
      return data;
    });
};

exports.getMemeberPurchases = async (id) => {
  let data = await fetch(
    "https://api.alegra.com/api/v1/invoices/?client_id=" + id,
    {
      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((json) => {
      const data = json.map((item) => {
        return {
          id: item["id"],
          date: item["date"],
          client: item["client"]["name"],
          number: item["numberTemplate"]["fullNumber"],
          total: item["total"],
        };
      });
      return data;
    });
  return data;
};
