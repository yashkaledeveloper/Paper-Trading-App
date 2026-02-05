import React, { useEffect, useState } from 'react'
import StockCard from './components/StockCard'
import "./css/Search.css"
// import { stocks } from "./components/data"
import axios from 'axios'

// export const stock = [
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   },
//   {
//     symbol: "NVDA",
//     company: "NVIDIA Corporation",
//     sector: "TECHNOLOGY",
//     exchange: "NASDAQ",
//     price: "912.45",
//     change: "+3.24%",
//     isPositive: true
//   },
//   {
//     symbol: "TSLA",
//     company: "Tesla, Inc.",
//     sector: "CONSUMER CYCLICAL",
//     exchange: "NASDAQ",
//     price: "175.22",
//     change: "-1.12%",
//     isPositive: false
//   }
// ];

const Search = () => {
   const apiUrl = import.meta.env.VITE_API_URL;

  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/allstocks`, { withCredentials: true });

        setStocks(data)
      } catch (err) {
        setStocks(null)
      }
    }
    
    fetchData()
    setInterval(() => {
      fetchData()
    }, 5000);
  }, [])

  if (!stocks) return null


  return (
    <>
      <div className="search-market">
        <h1>Search Markets</h1>
        <p>Explore global equities, ETFs, and indices</p>

        <div className="search-box">
          <span className="material-symbols-outlined">
            search
          </span>

          <input
            type="text"
            placeholder="Search by company name or ticker symbol (e.g. AAPL, Tesla)"
          />

          <div className="tags">
            <span>CMD</span>
            <span>K</span>
          </div>
        </div>
      </div>


      <div className="card-container">
        {stocks.map((stock) => (
          <StockCard
            key={stock._id}
            id={stock._id}
            fav={stock.isFavourite}
            symbol={stock.symbol}
            company={stock.name}
            sector={stock.sector}
            exchange={stock.exchange}
            price={stock.dayHigh}
            change={stock.change}
            isPositive={stock.isActive}
          />
        ))}
      </div>
    </>
  );
}

export default Search