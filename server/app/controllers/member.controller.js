const memberAPIService = require("../services/member.api.service");
const purchaseAPIService = require("../services/purchase.api.service");
const memberService = require("../services/member.db.service");
const db = require("../models");
const Member = db.members;

// create new member
exports.create = async (req, res) => {
  const data = req.body;

  if (req.query.dbOnly == "true") {
    // get code if not provided
    const code = data["code"] || (await memberService.getNewCode());

    // Create a Member
    const member = new Member({
      alegraId: data["alegraId"],
      code: code,
      name: data["name"],
      address: data["address"],
      phone: data["phone"],
      email: data["email"],
      referenceCode: data["referenceCode"]
    });

    res.send({
      message: member
    });

    memberService.saveDb(member).then((result) => {
      console.log(result);
      res.send(result);
    });
  } else {
    res.send({
      message: "Create member"
    });
  }
};

// get all members
exports.getAll = (req, res) => {
  memberAPIService.getMembers().then((data) => {
    res.json(data);
  });
};

// get member by code
exports.getByCode = (req, res) => {
  memberAPIService.getMemberByCode(req.params["code"]).then((data) => {
    res.json(data);
  });
};

// get member purchases
exports.getMemberPurchases = (req, res) => {
  purchaseAPIService.getMemeberPurchases(req.params["id"]).then((data) => {
    res.json(data);
  });
};
