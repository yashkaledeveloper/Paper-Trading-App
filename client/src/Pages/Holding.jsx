import React from 'react'
import { orders } from "./components/data"
import "./css/Order.css"
import "./css/Holding.css"

const Holding = () => {
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
          <span>Stock / Asset</span>
          <span>qty</span>
          <span>avg cost</span>
          <span>current price</span>
          <span>Market Value</span>
          <span>Total P/L</span>
        </div>

        {orders.map((stock) => (
          <div className="h-table-row" key={stock._id}>

            <div className="asset">
              <div className="logos">{stock.stockSymbol[0]}</div>
              <div>
                <strong>{stock.stockSymbol}</strong>
                <p>
                  {stock.stockSymbol} Incorporation.
                </p>
              </div>
            </div>

            <div className={`type ${stock.type == 'SELL' ? "o-sell" : "o-buy"}`}>{stock.type}</div>

            <div className="quantity"><strong>{stock.quantity}</strong></div>

            <div className="execution"><strong>{stock.price}</strong></div>

            <div className="total"><strong>{stock.quantity * stock.price}</strong></div>

            <div className="status">{stock.status}</div>

          </div>
        ))}
      </div>
    </>
  );
}

export default Holding