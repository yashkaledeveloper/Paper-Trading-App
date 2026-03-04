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