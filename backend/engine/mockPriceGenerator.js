// engine/priceEngine.js
const { StockModel } = require("../model/StockModel");

let marketTrend = 0.02; // 0.02% upward bias

function getRandomPercent() {
  const volatility = 0.4; // total 0.4 = ±0.2%
  return (Math.random() - 0.5) * volatility + marketTrend;
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
