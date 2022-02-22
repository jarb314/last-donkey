const { authJwt } = require("../middlewares");
const controller = require("../controllers/purchase.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/purchases",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllPurchases
  );
};
