const { BuyStock } = require("../Controllers/OrdersController");
// const { createBalance } = require("../Controllers/WalletController");
const {
  getWallet,
  creditWallet,
  debitWallet,
} = require("../Controllers/WalletController");
const {
  buyStock,
  sellStock,
  getUserOrders,
} = require("../Controllers/OrdersController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

// router.post("/balance", userVerification, createBalance);

// orders
router.post("/buy", userVerification, buyStock);
router.post("/sell", userVerification, sellStock);
router.get("/getorders", userVerification, getUserOrders);



// wallet
router.get("/getwallet", userVerification, getWallet);
// optional utility routes (testing / admin / demo)
router.post("/credit", userVerification, creditWallet);
router.post("/debit", userVerification, debitWallet);

module.exports = router;