const { BuyStock } = require("../Controllers/OrdersController");
// const { createBalance } = require("../Controllers/WalletController");
const {
  getWallet,
  creditWallet,
  debitWallet,
} = require("../Controllers/WalletController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/buy", userVerification, BuyStock);

// router.post("/balance", userVerification, createBalance);

router.get("/getwallet", userVerification, getWallet);
// optional utility routes (testing / admin / demo)
router.post("/credit", userVerification, creditWallet);
router.post("/debit", userVerification, debitWallet);

module.exports = router;