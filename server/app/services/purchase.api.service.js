const fetch = require("node-fetch");
const memberService = require("./member.api.service");
require("dotenv").config();

const headers = {
  Authorization: process.env.AUTHORIZATION
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
      headers: headers
    }
  )
    .then((res) => res.json())
    .then((json) => {
      // get purchases
      const purchases = json.map((item) => {
        return {
          id: item["id"],
          date: new Date(item["date"]),
          client: item["client"]["name"],
          number: item["numberTemplate"]["fullNumber"],
          total: item["total"]
        };
      });

      // get month consumpsion
      let purchaseOfTheMonth = purchases.filter((el) => {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return el.date > firstDay && el.date < lastDay;
      });
      const monthConsumpsion =
        purchaseOfTheMonth.length == 0
          ? 0
          : purchaseOfTheMonth
              .map((el) => el.total)
              .reduce((a, b) => {
                return a + b;
              });

      // get points
      const points = Math.round(
        purchases.map((el) => el.total).reduce((a, b) => a + b) * 0.03
      );

      return {
        monthConsumpsion: monthConsumpsion,
        points: points,
        purchases: purchases
      };
    });
  return data;
};
