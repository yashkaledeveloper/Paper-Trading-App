// models/Stock.js
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      unique: true, // TCS, INFY — duplicate nahi
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    exchange: {
      type: String,
      enum: ["NSE", "BSE"],
      default: "NSE",
    },

    sector: {
      type: String,
      default: "General",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const StockModel = mongoose.model("Stock", stockSchema);

module.exports = { StockModel }