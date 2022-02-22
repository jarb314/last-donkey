var _ = require("lodash");
const purchaseService = require("../services/purchase.api.service");

// get all purchases
exports.getAllPurchases = (req, res) => {
  purchaseService.getPurchases().then((purchases) => {
    const { month, year, seller, commission } = req.query;

    // filter purchases by year
    if (year) {
      purchases = purchases.filter((p) => {
        let date = new Date(p.date);
        return date.getFullYear() == year;
      });
    }
    // filter purchases by month
    if (month) {
      purchases = purchases.filter((p) => {
        let date = new Date(p.date);
        return date.getMonth() + 1 == month;
      });
    }
    // filter purchases by seller
    if (seller) {
      purchases = purchases.filter((p) =>
        seller != " " ? p.seller.name == seller : _.isEmpty(p.seller)
      );
    }

    var total = 0;
    purchases.forEach((p) => {
      total += p.total;
    });
    res.json({
      total: total,
      commission: commission ? total * (commission / 100) : total * 0.04,
      purchases: purchases
    });
  });
};
