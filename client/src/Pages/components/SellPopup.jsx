import React, { useState } from 'react'
import './css/Popup.css'

const SellPopup = ({ stock, onClose, color }) => {
  const [totalPrice, setTotalPrice] = useState(stock.lastPrice);

  const handleQty = (qty) => {
    setTotalPrice(qty*(stock.lastPrice))
  }

  return (
    <div className="popup">
      <form action="">
        <div className="icon" style={{backgroundColor: color}}>{stock.symbol.slice(0, 2)}</div>
        <h2>{stock.name}</h2>
        <p style={{margin:"10px 0px"}}><strong>Sector: </strong>{stock.sector} | <strong>Exchange:</strong> {stock.exchange}</p>
        <div className="total">
          <div className="t" style={{color: color}}>&#x20b9;{totalPrice}</div>
        </div>
        <div style={{ display: 'flex', gap: '50px' }}>
          <div className="qty">
            <input type="number" defaultValue={1} min={1} onChange={(e) => handleQty(e.target.value)}/>
            <p>Quantity</p>
          </div>
          <div className="price">
            <input type="number" value={stock.lastPrice} disabled/>
            <p>Price</p>
          </div>
        </div>
        <button style={{backgroundColor: color, borderColor: color}}>SELL STOCK</button>
        <p style={{marginTop:'10px',fontSize:'14px'}}>-- {stock.symbol} --</p>
      </form>
      <div className="close" onClick={onClose}>
        <span class="material-symbols-outlined">
          close
        </span>
      </div>
    </div>
  )
}

export default SellPopup