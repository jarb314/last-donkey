module.exports = (app) => {
  const purchase = require("../controllers/purchase.controller");

  app.get("/api/purchases", purchase.getAllPurchases);
};
