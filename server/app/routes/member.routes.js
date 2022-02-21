const { authJwt } = require("../middlewares");
const memberController = require("../controllers/member.controller");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/members",
    memberController.validate("createMember"),
    memberController.create
  );

  app.get(
    "/api/members",
    [authJwt.verifyToken, authJwt.isAdmin],
    memberController.getAll
  );

  app.get(
    "/api/members/:code",
    [authJwt.verifyToken],
    memberController.getByCode
  );

  // app.get("/api/members/:id/purchases", memberController.getMemberPurchases);
};
