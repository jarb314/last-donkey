const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const purchaseService = require("../services/purchaseService");
const memberService = require("../services/memberService");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

// setup swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/purchases", (req, res) => {
  purchaseService.getPurchases().then((data) => {
    var total = 0;
    data.forEach((p) => {
      total += p.total;
    });
    res.json({
      total: total,
      comision: total * 0.04,
      purchases: data,
    });
  });
});

app.get("/members", (req, res) => {
  memberService.getMembers().then((data) => {
    res.json(data);
  });
});

app.get("/members/:code", (req, res) => {
  memberService.getMemberByCode(req.params["code"]).then((data) => {
    res.json(data);
  });
});

app.get("/members/:id/purchases", (req, res) => {
  purchaseService.getMemeberPurchases(req.params["id"]).then((data) => {
    res.json(data);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
