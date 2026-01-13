// engine/priceEngine.js
const { StockModel } = require("../model/StockModel");

function getRandomPercent() {
  return Math.random() * 4 - 2;
}

async function startPriceEngine() {
  console.log("📈 Mock price engine started");

  setInterval(async () => {
    const stocks = await StockModel.find();

    for (let stock of stocks) {
      const percent = parseFloat(getRandomPercent());
      const change = +(stock.lastPrice * percent / 100).toFixed(2);
      const newPrice = +(stock.lastPrice + change).toFixed(2);

      if (newPrice > 1) {
        stock.lastPrice = newPrice;
        stock.change = change;
        stock.changePercent = percent;
        stock.dayHigh = Math.max(stock.dayHigh || newPrice, newPrice);
        stock.dayLow = Math.min(stock.dayLow || newPrice, newPrice);
        await stock.save();
      }
    }
  }, 5000);
}

module.exports = startPriceEngine;
