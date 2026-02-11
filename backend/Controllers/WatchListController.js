const { StockModel } = require("../model/StockModel");
const { WatchListModel } = require("../model/WatchListModel");

exports.getWatchlist = async (req, res) => {
  try {
    const list = await WatchListModel.find({ userId: req.user.id }).populate("stockId");

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { id, symbol, fav, } = req.body;

    const user = req.user.id;


    const stockExist = await WatchListModel.findOne({
      userId: user,
      symbol,
    });

    if (stockExist) {
      return res.status(409).json({
        message: "Stock already exists in watchlist",
      });
    }

    // await StockModel.findOneAndUpdate({ _id: id }, { $set: { isFavourite: true} }, { new: true });

    const item = await WatchListModel.create({
      userId: user,
      stockId: id,
      stockSymbol: symbol,
    });

    return res.status(201).json({
      message: "Stock added to watchlist",
      item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.removeFromWatchlist = async (req, res) => {
  try {
    const { stockSymbol } = req.params;

    await WatchListModel.findOneAndDelete({
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


exports.currentPrice = async (req, res) => {
  try {
    const { symbol } = req.body;
    const data = await StockModel.find({symbol: {$in: symbol}})
    res.status(200).json(data)
  } catch(err) {
    console.log(err);
  }
}