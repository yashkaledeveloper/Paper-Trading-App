// models/Holding.js
const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stockSymbol: {
      type: String,
      required: true,
      uppercase: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    avgBuyPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// ensure one holding per user per stock
holdingSchema.index({ userId: 1, stockSymbol: 1 }, { unique: true });

const HoldingModel = mongoose.model("Holding", holdingSchema);

module.exports = { HoldingModel };