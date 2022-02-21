module.exports = (app) => {
  const memberController = require("../controllers/member.controller");

  app.post(
    "/api/members",
    memberController.validate("createMember"),
    memberController.create
  );

  app.get("/api/members", memberController.getAll);

  app.get("/api/members/:code", memberController.getByCode);

  // app.get("/api/members/:id/purchases", memberController.getMemberPurchases);
};
