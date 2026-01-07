// controllers/walletController.js
const { WalletModel } = require("../model/WalletModel");



exports.getWallet = async (req, res) => {
  try {
    const wallet = await WalletModel.findOne({ userId: req.user.id });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.creditWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const wallet = await WalletModel.findOne({ userId: req.user.id });

    wallet.balance += amount;
    await wallet.save();

    res.status(200).json({
      message: "Wallet credited",
      balance: wallet.balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.debitWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const wallet = await WalletModel.findOne({ userId: req.user.id });

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    res.status(200).json({
      message: "Wallet debited",
      balance: wallet.balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
