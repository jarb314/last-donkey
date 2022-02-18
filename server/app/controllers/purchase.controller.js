const purchaseService = require("../services/purchase.api.service");

// get all purchases
exports.getAllPurchases = (req, res) => {
  purchaseService.getPurchases().then((data) => {
    var total = 0;
    data.forEach((p) => {
      total += p.total;
    });
    res.json({
      total: total,
      comision: total * 0.04,
      purchases: data
    });
  });
};
