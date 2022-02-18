module.exports = (app) => {
  const member = require("../controllers/member.controller");

  app.post("/api/members", member.validate("createMember"), member.create);

  app.get("/api/members", member.getAll);

  app.get("/api/members/:code", member.getByCode);

  app.get("/api/members/:id/purchases", member.getMemberPurchases);
};
