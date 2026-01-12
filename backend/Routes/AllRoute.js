const { getWallet } = require("../Controllers/WalletController");
const { buyStock, sellStock, getUserOrders } = require("../Controllers/OrdersController");
const { getHoldings } = require("../Controllers/HoldingController")

const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// allholdings
router.get("/allhodings", userVerification, getHoldings);

// orders
router.post("/buy", userVerification, buyStock);
router.post("/sell", userVerification, sellStock);
router.get("/allorders", userVerification, getUserOrders);

// wallet
router.get("/getwallet", userVerification, getWallet);

module.exports = router;