import React, { useEffect, useState, useRef } from 'react'
import { orders } from "./components/data"
import "./css/Order.css"
import "./css/Holding.css"
import axios from 'axios'

const Holding = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/allhodings`,
          { withCredentials: true }
        );
        setHoldings(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHoldings();
  }, []);


  const priceIntervalRef = useRef(null);

  useEffect(() => {
    if (!holdings.length) return;

    const fetchPrice = async () => {
      try {
        const symbols = holdings.map(h => h.stockSymbol);

        const { data } = await axios.post(
          `${apiUrl}/api/realprice`,
          { symbol: symbols },
          { withCredentials: true }
        );
        

        const stockMap = {};
        data.forEach(stock => {
          stockMap[stock.symbol] = stock;
        });

        setHoldings(prev =>
          prev.map(item => {
            const stock = stockMap[item.stockSymbol];
            if (!stock) return item;
            
            const name = stock.name;
            const invested = item.quantity * item.avgBuyPrice;
            const currentValue = item.quantity * stock.lastPrice;
            const pl = currentValue - invested;

            return {
              ...item,
              name: name,
              ltp: stock.lastPrice.toFixed(2),
              invested: invested.toFixed(2),
              currentValue: currentValue.toFixed(2),
              pl: pl.toFixed(2),
              plPercent: invested ? ((pl / invested) * 100).toFixed(2) : 0
            };
          })
        );
      } catch (err) {
        console.error(err);
      }
    };

    
    fetchPrice(); // first call
    console.log(holdings);

    priceIntervalRef.current = setInterval(fetchPrice, 5000);

    return () => clearInterval(priceIntervalRef.current);

  }, [holdings.length]); // ✅ only once when holdings loaded


  return (
    <>

      <div className="header-top">
        <div className="title">
          <h2>Your Holdings</h2>
          <p>Monitor 12 active positions</p>
        </div>
      </div>


      <div className="market-table">
        <div className="h-table-header">
          <span>Stock</span>
          <span>qty</span>
          <span>avg</span>
          <span>LTP</span>
          <span>Invested</span>
          <span>Current</span>
          <span>P/L</span>
          <span>P/L %</span>
        </div>

        {holdings.map((stock) => (
          <div className="h-table-row" key={stock?._id}>

            <div className="asset">
              <div className="logos">{stock?.stockSymbol[0]}</div>
              <div>
                <strong>{stock?.name}</strong>
                <p>{stock.stockSymbol}</p>
              </div>
            </div>

            <div className='qty'><strong>{stock?.quantity}</strong></div>

            <div className="avg"><strong>{(stock.avgBuyPrice).toFixed(2)}</strong></div>

            <div className="ltp"><strong>{stock.ltp}</strong></div>

            <div className="invested"><strong>{stock.invested}</strong></div>

            <div className="curr-val"><strong>{stock.currentValue}</strong></div>

            <div className={`pl status ${Number(stock.invested) < Number(stock.currentValue) ? 'green' : 'red' }`}><strong>{stock.pl}</strong></div>

            <div className="percentage">{stock.plPercent}%</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Holding