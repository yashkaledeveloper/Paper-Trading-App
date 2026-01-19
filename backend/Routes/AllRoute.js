const { getWallet } = require("../Controllers/WalletController");
const { buyStock, sellStock, getUserOrders } = require("../Controllers/OrdersController");
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require("../Controllers/WatchListController");
const { getHoldings } = require("../Controllers/HoldingController")

const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// allstocks
app.get("/allstocks", async (req, res) => {
    let data = await StockModel.find({});
    res.json(data)
})

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