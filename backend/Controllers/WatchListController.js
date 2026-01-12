// controllers/watchlistController.js
const Watchlist = require("../model/WatchListModel");

exports.getWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id });

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { stockSymbol } = req.body;

    const item = await Watchlist.create({
      userId: req.user.id,
      stockSymbol,
    });

    res.status(201).json({
      message: "Stock added to watchlist",
      item,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Stock already in watchlist" });
    }

    res.status(500).json({ error: err.message });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { stockSymbol } = req.params;

    await Watchlist.findOneAndDelete({
      userId: req.user.id,
      stockSymbol,
    });

    res.status(200).json({
      message: "Stock removed from watchlist",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
