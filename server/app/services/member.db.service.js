exports.saveDb = async (member) => {
  return member
    .save(member)
    .then((data) => {
      return { code: 200, message: "Member inserted correctly" };
    })
    .catch((err) => {
      return {
        code: 500,
        message: err.message || "Some error occurred while creating the Member."
      };
    });
};

exports.getNewCode = () => {
  const db = require("../models/");
  return db.members
    .find()
    .limit(1)
    .sort({ code: -1 })
    .then((member) => {
      let code = parseInt(member[0].code.replace("CN-", "")) + 1;
      return `CN-${String(code).padStart(4, "0")}`;
    })
    .catch((err) => {
      return {
        message: err.message || "Some error occurred while geting the code."
      };
    });
};
