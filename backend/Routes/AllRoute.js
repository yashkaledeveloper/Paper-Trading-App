const { getWallet } = require("../Controllers/WalletController");
const { buyStock, sellStock, getUserOrders } = require("../Controllers/OrdersController");
const { getWatchlist, addToWatchlist, removeFromWatchlist, currentPrice } = require("../Controllers/WatchListController");
const { getHoldings } = require("../Controllers/HoldingController")

const { userVerification } = require("../Middlewares/AuthMiddleware");
const { StockModel } = require("../model/StockModel");

const router = require("express").Router();

router.post("/eachStockInfo", async (req, res) => {
    let {_id} = req.body;
    let data = await StockModel.findOne({_id})
    res.json(data);
})

// allstocks
router.get("/allstocks", async (req, res) => {
    let data = await StockModel.find({});
    res.json(data);
})

router.post("/realprice", userVerification, currentPrice)

// user allholdings
router.get("/allhodings", userVerification, getHoldings);

router.post("/search", async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.json([]);
  }

  const stocks = await StockModel.find({
    name: { $regex: name, $options: "i" }
  }).limit(10);

  res.json(stocks);
});

// watchlist
router.get("/getwatchlist", userVerification, getWatchlist);
router.post("/addwatchlist", userVerification, addToWatchlist);
router.post("/delwatchlist", userVerification, removeFromWatchlist);

// user orders
router.post("/buy", userVerification, buyStock);
router.post("/sell", userVerification, sellStock);
router.get("/allorders", userVerification, getUserOrders);

// user wallet
router.get("/getwallet", userVerification, getWallet);

module.exports = router;