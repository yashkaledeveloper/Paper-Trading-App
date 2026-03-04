// models/Watchlist.js
const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      require: true
    },
    stockSymbol: {
      type: String,
      required: true,
      uppercase: true,
    },
  },
  { timestamps: true }
);

// One user cannot add same stock twice
watchlistSchema.index({ userId: 1, stockSymbol: 1 }, { unique: true });

const WatchListModel = mongoose.model("Watchlist", watchlistSchema);

module.exports = { WatchListModel }
