const { getWallet } = require("../Controllers/WalletController");
const { buyStock, sellStock, getUserOrders } = require("../Controllers/OrdersController");
const { getWatchlist, addToWatchlist, removeFromWatchlist, currentPrice } = require("../Controllers/WatchListController");
const { getHoldings } = require("../Controllers/HoldingController")

const { userVerification } = require("../Middlewares/AuthMiddleware");
const { StockModel } = require("../model/StockModel");

const router = require("express").Router();

// allstocks
router.get("/allstocks", async (req, res) => {
    let data = await StockModel.find({});
    res.json(data)
})

router.post("/realprice", userVerification, currentPrice)

// user allholdings
router.get("/allhodings", userVerification, getHoldings);

// watchlist
router.get("/getwatchlist", userVerification, getWatchlist);
router.post("/addwatchlist", userVerification, addToWatchlist);
router.delete("/delwatchlist:stockSymbol", userVerification, removeFromWatchlist);

// user orders
router.post("/buy", userVerification, buyStock);
router.post("/sell", userVerification, sellStock);
router.get("/allorders", userVerification, getUserOrders);

// user wallet
router.get("/getwallet", userVerification, getWallet);

module.exports = router;