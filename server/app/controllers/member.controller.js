const memberAPIService = require("../services/member.api.service");
const purchaseAPIService = require("../services/purchase.api.service");
const memberService = require("../services/member.db.service");
const db = require("../models");
const Member = db.members;
const { body, validationResult } = require("express-validator");

// create new member
exports.create = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: "Validation error", errors: errors.array() });
    return;
  }

  const data = req.body;

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

  if (req.query.dbOnly == "true") {
    // save only in the db
    memberService.saveDb(member).then((result) => {
      console.log(result);
      res.send(result);
    });
  } else {
    // save member on Alegra
    const apiResult = await memberAPIService.createMember(member);
    // get Id from alegra
    member.alegraId = apiResult["id"];
    // save member in db
    memberService.saveDb(member).then((result) => {
      console.log(result);
      res.send(result);
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
exports.getByCode = async (req, res) => {
  let data = await memberAPIService.getMemberByCode(req.params["code"]);
  if (!data) {
    res.status(404).json({ message: "Member not found" });
  }
  let purchases = await purchaseAPIService.getMemeberPurchases(data["id"]);
  data["points"] = purchases["points"];
  data["monthConsumpsion"] = purchases["monthConsumpsion"];
  data["purchases"] = purchases["purchases"];
  res.json(data);
};

// get member purchases
// exports.getMemberPurchases = (req, res) => {
//   purchaseAPIService.getMemeberPurchases(req.params["id"]).then((data) => {
//     res.json(data);
//   });
// };

// validator
exports.validate = (method) => {
  switch (method) {
    case "createMember": {
      return [
        body("code").optional(),
        body("name", `Name doesn't exists`).exists(),
        body("alegraId").optional(),
        body("email", "Invalid email").optional().isEmail(),
        body("address", "Address dosen't exists").exists(),
        body("phone").optional().isInt()
      ];
    }
  }
};
