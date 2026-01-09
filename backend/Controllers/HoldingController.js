// controllers/holdingController.js
const Holding = require("../models/Holding");

exports.getHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user.id });

    res.status(200).json(holdings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHoldingOnBuy = async (
  userId,
  stockSymbol,
  quantity,
  price
) => {
  let holding = await Holding.findOne({ userId, stockSymbol });

  if (holding) {
    const totalQty = holding.quantity + quantity;

    const newAvg =
      (holding.quantity * holding.avgBuyPrice +
        quantity * price) /
      totalQty;

    holding.quantity = totalQty;
    holding.avgBuyPrice = newAvg;

    await holding.save();
  } else {
    await Holding.create({
      userId,
      stockSymbol,
      quantity,
      avgBuyPrice: price,
    });
  }
};


exports.updateHoldingOnSell = async (
  userId,
  stockSymbol,
  quantity
) => {
  const holding = await Holding.findOne({ userId, stockSymbol });

  if (!holding || holding.quantity < quantity) {
    throw new Error("Not enough stock to sell");
  }

  holding.quantity -= quantity;

  if (holding.quantity === 0) {
    await holding.deleteOne();
  } else {
    await holding.save();
  }
};
