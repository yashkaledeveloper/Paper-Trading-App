const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
})

const WatchListModel = new mongoose.model("watchlist", watchListSchema);

module.exports = { WatchListModel };