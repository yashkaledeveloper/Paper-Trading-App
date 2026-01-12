// controllers/orderController.js
const { OrdersModel } = require("../model/OrdersModel.js")
const { WalletModel } = require("../model/WalletModel.js")
const { HoldingModel } = require("../model/HoldingsModel.js");

exports.buyStock = async (req, res) => {
  try {
    const { stockSymbol, quantity, price } = req.body;
    const userId = req.user.id;

    // 1. Wallet check
    const wallet = await WalletModel.findOne({userId});
    
    const totalCost = quantity * price;

    if (wallet.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // 2. Create order
    const order = await OrdersModel.create({
      userId,
      stockSymbol,
      type: "BUY",
      quantity,
      price,
      status: "EXECUTED",
    });

    // 3. Wallet update
    wallet.balance -= totalCost;
    await wallet.save();

    // 4. Holdings update
    let holding = await HoldingModel.findOne({ userId, stockSymbol });

    if (holding) {
      const newQty = holding.quantity + quantity;
      const newAvg = (holding.quantity * holding.avgBuyPrice + quantity * price) / newQty;
      holding.quantity = newQty;
      holding.avgBuyPrice = newAvg;
      await holding.save();
    } else {
      await HoldingModel.create({
        userId,
        stockSymbol,
        quantity,
        avgBuyPrice: price,
      });
    }

    res.status(201).json({
      message: "Buy order executed",
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.sellStock = async (req, res) => {
  try {
    const { stockSymbol, quantity, price } = req.body;
    const userId = req.user.id;

    // 1. Holding check
    const holding = await HoldingModel.findOne({ userId, stockSymbol });

    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock to sell" });
    }

    // 2. Create order
    const order = await OrdersModel.create({
      userId,
      stockSymbol,
      type: "SELL",
      quantity,
      price,
      status: "EXECUTED",
    });

    // 3. Wallet update
    const wallet = await WalletModel.findOne({ userId });
    wallet.balance += quantity * price;
    await wallet.save();

    // 4. Holdings update
    holding.quantity -= quantity;

    if (holding.quantity === 0) {
      await holding.deleteOne();
    } else {
      await holding.save();
    }

    res.status(201).json({
      message: "Sell order executed",
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

