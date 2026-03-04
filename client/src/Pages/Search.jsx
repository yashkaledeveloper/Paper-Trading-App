import React, { useEffect, useState } from 'react'
import StockCard from './components/StockCard'
import "./css/Search.css"
// import { stocks } from "./components/data"
import axios, { all } from 'axios'
import { toast } from 'react-toastify';

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
const apiUrl = import.meta.env.VITE_API_URL;


const Search = () => {

  const [stocks, setStocks] = useState(null);
  const [allStocks, setAllStocks] = useState(null);
  const [searching, setSearching] = useState(false);

  // 🔁 polling
  useEffect(() => {
    if (searching) return;

    const fetchData = async () => {
      const { data } = await axios.get(
        `${apiUrl}/api/allstocks`,
        { withCredentials: true }
      );
      setStocks(data);
      setAllStocks(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, [searching]);

  // 🔍 search
  const handleSearch = async (name) => {
    // polling band
    const { data } = await axios.post(
      `${apiUrl}/api/search`,
      { name },
      { withCredentials: true }
    );

    if (Boolean(data.length)) {
      setSearching(true);
      setStocks(data)
    } else {
      toast.warning('Stock Not Available')
      setStocks(allStocks)
    }


  };

  if (!stocks) return null;

  // const [stocks, setStocks] = useState(null);
  // const [value, setValue] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get(`${apiUrl}/api/allstocks`, { withCredentials: true });
  //     setStocks(data)
  //   } catch (err) {
  //     setStocks(null)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()

  //   const interval = setInterval(() => {
  //     fetchData()
  //   }, 5000);

  //   // console.log(!(Object.keys(value).length === 0));

  //   if (!(Object.keys(value).length === 0)) {
  //     clearInterval(interval); // 👈 direct call
  //     setStocks(value)
  //   }

  //   return () => {
  //     clearInterval(interval); // 👈 cleanup on unmount / dependency change
  //   };

  // }, [value])



  // const handleSearch = async (e) => {
  //   const { data } = await axios.post(`${apiUrl}/api/search`, { name: e }, { withCredentials: true });
  //   setValue(data)
  // };

  // if (!stocks) return null


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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e.target.value)
              }
            }}
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
            price={stock.lastPrice}
            change={stock.change}
            isPositive={stock.isActive}
          />
        ))}
      </div>
    </>
  );
}

export default Search