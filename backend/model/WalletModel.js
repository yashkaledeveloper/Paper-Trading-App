const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      required: true,
      default: 100000
    }
  },
  { timestamps: true }
);

const WalletModel = mongoose.model("Wallet", walletSchema);

module.exports = { WalletModel }
