import React, { useState, useEffect } from 'react'
import "./css/Order.css"
import { orders } from "./components/data"
import axios from 'axios';

// _id: "69665f32221389706070339b",
// userId: "6965d919faed05ddae7bdc21",
// stockSymbol: "DMS",
// type: "SELL",
// quantity: 2,
// price: 20,
// status: "EXECUTED",
// createdAt: "2026-01-13T15:05:22.070Z",
// updatedAt: "2026-01-13T15:05:22.070Z",


const Order = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = ["All Orders", "Completed", "Pending", "Failed"];

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${apiUrl}/api/allorders`,
        { withCredentials: true }
      )
      setOrder(data)
    }
    fetchData()

  }, [])

  return (
    <>
      <div className="order-history-header">
        {/* Top Section */}
        <div className="header-top">
          <div className="title">
            <h2>Order History</h2>
            <p>Review and track your recent equity transactions.</p>
          </div>

          <div className="header-actions">
            <button className="btn outline">
              <span className="material-symbols-outlined">calendar_month</span>
              Oct 1 - Oct 31, 2023
            </button>

            <button className="btn outline">
              <span className="material-symbols-outlined">filter_list</span>
              Filter
            </button>

            <button className="btn primary">
              <span className="material-symbols-outlined">download</span>
              Export CSV
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------- */}

      <div className="market-table">
        <div className="o-table-header">
          <span>Stock / Asset</span>
          <span>Type</span>
          <span>Quantity</span>
          <span>Execution Price</span>
          <span>Total Value</span>
          <span>Status</span>
          <span>Date & Time</span>
        </div>

        {order.map((stock) => (
          <div className="o-table-row" key={stock._id}>

            <div className="asset">
              <div className="logos">{stock.stockSymbol[0]}</div>
              <div>
                <strong>{stock.stockSymbol}</strong>
              </div>
            </div>

            <div className={`type ${stock.type == 'SELL' ? "o-sell" : "o-buy"}`}>{stock.type}</div>

            <div className="quantity"><strong>{stock.quantity}</strong></div>

            <div className="execution"><strong>{stock.price}</strong></div>

            <div className="total"><strong>{stock.quantity * stock.price}</strong></div>

            <div className="status">{stock.status}</div>

            <div className="datetime">{formatDate(stock.updatedAt)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}


export default Order