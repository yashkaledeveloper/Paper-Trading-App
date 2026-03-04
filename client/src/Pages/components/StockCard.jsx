import axios from "axios";
import "./css/StockCard.css";
import { useState } from "react";
import BuyPopup from "./BuyPopup";
import SellPopup from "./SellPopup";
import { ToastContainer, toast } from 'react-toastify';

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
    const [buypopup, setBuyPopup] = useState(null);
    const [sellpopup, setSellPopup] = useState(null);
    const notify = (symbol) => toast.success(symbol+" Added to Your WatchList");

    const addToWatchList = async (id, symbol) => {
        try {
            const {data} = await axios.post(`${apiUrl}/api/addwatchlist`, { id, symbol}, { withCredentials: true })
            toast.success(data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }

    }

    const stockInfo = async (id, type) => {
        const { data } = await axios.post(`${apiUrl}/api/eachStockInfo`, { _id: id }, { withCredentials: true });
        if (type == 'buy') {
            setBuyPopup(data);
        } else {
            setSellPopup(data);
        }
    }

    return (
        <>
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

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="quick-buy" onClick={() => stockInfo(id, 'buy')}><abbr title="BUY">
                            B
                        </abbr></button>
                        <button className="quick-buy" onClick={() => stockInfo(id, 'sell')}><abbr title="SELL">
                            S
                        </abbr></button>
                        <button className="add-btn" onClick={() => addToWatchList(id, symbol)}>
                            <abbr title="ADD TO WATCHLIST">
                                <span class="material-symbols-outlined">
                                    add
                                </span>
                            </abbr>
                        </button>
                    </div>
                </div>
            </div>

            {buypopup && <BuyPopup stock={buypopup} onClose={() => setBuyPopup(null)} color={'#16a34a'} />}
            {sellpopup && <SellPopup stock={sellpopup} onClose={() => setSellPopup(null)} color={'#dc2626'} />}
        </>
    );
}
