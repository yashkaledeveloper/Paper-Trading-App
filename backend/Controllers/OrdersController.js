const { OrdersModel } = require("../model/OrdersModel");

module.exports.BuyStock = async (req, res, next) => {

    try {
        const { stockSymbol, quantity, price } = req.body;
        const userId = req.user.id;

        const order = await OrdersModel.create({
            userId,
            stockSymbol,
            type: "BUY",
            quantity,
            price,
            status: "EXECUTED",
        });

        res.status(201).json({
            message: "Buy order executed",
            order,
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
} 