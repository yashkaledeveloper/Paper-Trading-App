import axios from "axios";
import "./css/StockCard.css";
import { useState } from "react";

export default function StockCard({
    id,
    fav,
    symbol,
    company,
    sector,
    exchange,
    price,
    change,
    isPositive
}) {
     const apiUrl = import.meta.env.VITE_API_URL;  
    const [input, setInput] = useState(null);

    const addToWatchList = async (id, fav) => {
        try {
            await axios.post(`${apiUrl}/api/addwatchlist`, { id, symbol, fav: true }, { withCredentials: true })
        } catch (err) {
            setInput(null)
        }

    }
    return (
        <div className="stock-card">
            <div className="card-header">
                <div className="stock-info">
                    <div className="stock-logo">
                        {symbol.slice(0, 1)}
                    </div>

                    <div>
                        <h3>{symbol}</h3>
                        <p>{company}</p>
                    </div>
                </div>

                <span className="material-symbols-outlined">
                    info
                </span>
            </div>

            <div className="card-meta">
                <span>{sector}</span>
                <span className="exchange">{exchange}</span>
            </div>

            <div className="card-footer">
                <div>
                    <h2>&#x20b9;{price}</h2>
                    <p className={isPositive ? "positive" : "negative"}>
                        {isPositive ? "▲" : "▼"} {change}
                    </p>
                </div>

                {(!fav) ? <button className="add-btn" onClick={() => addToWatchList(id, fav)}>
                    <span class="material-symbols-outlined">
                        add
                    </span>
                </button> : <button className="add-btn" style={{background: '#fff', color: 'blue', border: '1px solid blue'}}><span class="material-symbols-outlined">
                    check
                </span></button>}
            </div>
        </div>
    );
}
